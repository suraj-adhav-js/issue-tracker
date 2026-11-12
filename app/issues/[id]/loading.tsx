import Skeleton from "@/app/components/Skeleton";
import StatusBedge from "@/app/components/StatusBedge";
import { Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetailLoadingPage = () => {
  return (
    <article>
      <Heading mt={"5"} mb={"2"} className="capitalize max-w-[32ch]" size={"8"}>
        <Skeleton />
      </Heading>
      <Flex gap={"2"} align={"center"} mb={"6"}>
        <Skeleton width="4rem" height="1rem" />
        <p className="text-gray-500 text-sm">
          <Skeleton width="10rem" height="1rem" />
        </p>
      </Flex>
      <Card className="prose max-w-[60ch]">
        <Skeleton count={5} />
      </Card>
    </article>
  );
};

export default IssueDetailLoadingPage;
