import { StatusBedge } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Button, Card } from "@radix-ui/themes";
import Link from "next/link";

interface Props{
    issue: Issue
}

const IssueDetailCard = ({issue}: Props) => {
  return (
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
  );
};

export default IssueDetailCard;
