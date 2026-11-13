import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

const IssueActions = () => {
  return (
    <div className="flex justify-between mb-3">
      <h1 className="text-3xl">Issues</h1>
      <Button asChild>
        <span className="gap-1!">
          <MdAdd fontWeight="800" fontSize={18} className="pr-[-10px]" />
          <Link href="/issues/new">Add issue</Link>
        </span>
      </Button>
    </div>
  );
};

export default IssueActions;
