import {Skeleton} from "@/app/components";

const NewIssueLoadingPage = () => {
  return (
    <div className="max-w-xl space-y-2">
      <Skeleton height="1.5rem" className="mb-2"/>
      <Skeleton height="10rem"/>
    </div>
  );
};

export default NewIssueLoadingPage;
