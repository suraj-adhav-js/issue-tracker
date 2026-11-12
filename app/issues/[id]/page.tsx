"use cache";

import StatusBedge from "@/app/components/StatusBedge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown'
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
      <Heading mt={"5"} mb={"2"} className="capitalize max-w-[32ch]" size={"8"}>{issue.title}</Heading>
      <Flex gap={"2"} align={"center"} mb={"6"}>
        <StatusBedge status={issue.status} className="opacity-100"/>
        <p className="text-gray-500 text-sm">{issue.createdAt.toLocaleString("en-IN", {dateStyle: 'full', timeStyle: "short"} )}</p>
      </Flex>
      <Card className="prose max-w-[60ch]">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </article>
  );
};

export default IssueDetailPage;
