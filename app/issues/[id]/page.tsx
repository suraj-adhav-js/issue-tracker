"use cache";

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

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
  return <div>{issue?.title}</div>;
};

export default IssueDetailPage;
