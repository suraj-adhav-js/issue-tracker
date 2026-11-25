"use client";
import { ErrorMessage } from "@/app/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiSolidError } from "react-icons/bi";
import z from "zod";
import { issueSchema } from "../../../validationSchema";
import { Issue } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormDate = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
    control,
  } = useForm<IssueFormDate>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue === undefined ? "" : issue.title,
      description: issue === undefined ? "" : issue.description,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setServerError("");
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data)
        router.push(`/issues/${issue.id}`);
        router.refresh();
      }
      else await axios.post("/api/issues", data);
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
      throw err;  
    }
  });

  useEffect(() => {
    if (isSubmitSuccessful && issue === undefined) {
      reset();
    }  
  }, [isSubmitSuccessful, issue, reset]);

  return (
    <form className="max-w-xl space-y-2" onSubmit={onSubmit}>
      {serverError && (
        <Callout.Root>
          <Callout.Icon>
            <BiSolidError />
          </Callout.Icon>
          <Callout.Text>{serverError}</Callout.Text>
        </Callout.Root>
      )}
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button type="submit" disabled={isSubmitting}>
        Submit {isSubmitting && <Spinner size={"1"}></Spinner>}
      </Button>
    </form>
  );
};

export default IssueForm;
