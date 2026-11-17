import React from "react";
import Skeleton from "react-loading-skeleton";

const IssueEditLoadingPage = () => {
  return (
    <div className="max-w-xl space-y-2">
      <Skeleton height="1.5rem" className="mb-2" />
      <Skeleton height="10rem" />
    </div>
  );
};

export default IssueEditLoadingPage;
