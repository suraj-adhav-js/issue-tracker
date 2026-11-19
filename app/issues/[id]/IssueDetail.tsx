import { Issue } from "@/app/generated/prisma/client";
import { Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props{
    issue: Issue
}

const IssueDetail = ({issue}: Props) => {
  return (
    <Card
      size={{ initial: "3", md: "4" }}
      className="border-0!"
    >
      <h1 className="capitalize text-2xl md:text-4xl font-extrabold mb-5 border-b border-gray-300 pb-5">
        {issue.title}
      </h1>

      <div className="prose max-w-full text-[16px]">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </div>
    </Card>
  );
};

export default IssueDetail;
