"use client";
import { ErrorMessage } from "@/app/components";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Callout,
  Spinner,
  TextField
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiSolidError } from "react-icons/bi";
import z from "zod";
import { createIssueSchema } from "../../validationSchema";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    control,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isSubmitting) return undefined;
    try {
      setServerError("");
      await axios.post("/api/issues", data);
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
      throw err;
    }
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); //reset
    }
  }, [isSubmitSuccessful, reset]);

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

export default NewIssuePage;
