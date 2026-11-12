"use cache";

import {StatusBedge} from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  
  const { id } = await params;

  if (Number.isNaN(Number(id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) notFound();
  return (
    <article>
      <Heading mt={"5"} mb={"2"} className="capitalize max-w-[32ch]" size={"8"}>
        {issue.title}
      </Heading>
      <div className="flex flex-col gap-2 items-start  mb-6 md:flex-row md:items-center">
        <StatusBedge status={issue.status} className="opacity-100" />
        <p className="text-gray-500 text-sm">
          {issue.createdAt.toLocaleString("en-IN", {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>
      </div>
      <Card className="prose max-w-[60ch]">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </article>
  );
};

export default IssueDetailPage;
