"use cache";

import { StatusBedge } from "@/app/components";
import prisma from "@/prisma/client";
import { Button, Card } from "@radix-ui/themes";
import Link from "next/link";
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
    <div>
      <article className="flex flex-col md:flex-row gap-8">
        <Card
          size={{ initial: "3", md: "4" }}
          className="border-0! flex-7/10 px-8 py-10"
        >
          <h1 className="capitalize text-2xl md:text-4xl font-extrabold mb-5 border-b border-gray-300 pb-5">
            {issue.title}
          </h1>
           
          <div className="prose max-w-none text-[16px]">
            <ReactMarkdown >{issue.description}</ReactMarkdown>
          </div>
        </Card>
        <div className="flex-3/10">
          <Card size="3">
            <h3>Details</h3>
            <div className="mt-7 mb-5 text-[0.9rem] [&>div]:border-b [&>div]:border-gray-300 [&>div]:py-1.5 [&>div]:flex [&>div]:justify-between [&>div>span:first-child]:text-gray-500 [&>div>span:last-child]:font-semibold">
              <div>
                <span>Status</span>
                <StatusBedge status={issue.status} />
              </div>
              <div>
                <span>Created</span>
                <span>
                  {issue.createdAt.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div>
                <span>Time</span>
                <span>
                  {issue.createdAt.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link className=" " href={`/issues/${issue.id}/edit`}>
                  Edit Issue
                </Link>
              </Button>
              <Button color="tomato" variant="outline" asChild>
                <Link href={`/issues/${issue.id}/edit`}>Delete Issue</Link>
              </Button>
            </div>
          </Card>
        </div>
      </article>
    </div>
  );
};

export default IssueDetailPage;
