import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import { connection } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}
const IssueEditPage = async ({ params }: Props) => {
  await connection();
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
