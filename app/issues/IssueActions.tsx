import { Button } from "@radix-ui/themes";
import Link from "next/link";
 

const IssueActions = () => {
  return (
    <div className="mb-3">
      <Button>
        <Link href="/issues/new">New</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
