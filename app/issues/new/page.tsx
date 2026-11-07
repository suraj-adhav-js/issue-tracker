"use client";
import dynamic from "next/dynamic";
import {
  TextArea,
  TextField,
  Button,
  Spinner,
  Callout,
} from "@radix-ui/themes";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { createIssueSchema } from "../../validationSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiSolidError } from "react-icons/bi";
import { useEffect, useState } from "react";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful, isSubmitting },
    control,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({ title: "", description: "" });
  //     router.push("/");
  //   }
  //   console.log("debug", isSubmitted);
  // }, [isSubmitSuccessful, reset, router]);

  const [serverError, setServerError] = useState("");
  return (
    <form
      className="max-w-xl space-y-2"
      onSubmit={handleSubmit(async (data) => {
        console.log('hello')
        try {
          await axios.post("/api/issues", data);
          reset();
        } catch (err) {
          setServerError("Something went wrong. Please try again.");
          throw err;
        }
      })}
    >

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

      <Button type="submit">
        Submit {isSubmitting && <Spinner size={"1"}></Spinner>}
      </Button>
    </form>
  );
};

export default NewIssuePage;
