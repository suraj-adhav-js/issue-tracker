import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetail from "./IssueDetail";
import IssueDetailCard from "./IssueDetailCard";
import { connection } from "next/server";
import SelectUser from "./SelectUser";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  await connection();
  const { id } = await params;

  if (Number.isNaN(Number(id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) notFound();
  return (
    <div>
      <article className="flex flex-col md:flex-row gap-8">
        <div className="flex-7/10">
          <IssueDetail issue={issue} />
        </div>
        <div className="flex-3/10 flex flex-col gap-3">
          <IssueDetailCard issue={issue} />
          <SelectUser issue={issue}/>
        </div>
      </article>
    </div>
  );
};

export default IssueDetailPage;
