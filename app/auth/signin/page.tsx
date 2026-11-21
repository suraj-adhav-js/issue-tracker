import { StatusBedge } from "@/app/components";
import { Status } from "@/app/generated/prisma/enums";
import logo from "@/public/issues-tracker.svg";
import { Table } from "@radix-ui/themes";
import Image from "next/image";
import { FaLock } from "react-icons/fa6";
import SignInBtn from "../SignInBtn";
import { Suspense } from "react";

interface Issues {
  id: number;
  title: string;
  status: Status;
}

const page = () => {
  const issues: Issues[] = [
    { id: 1, title: "Fix login redirect", status: "OPEN" },
    { id: 2, title: "Update dashboard layout", status: "IN_PROGRESS" },
    { id: 3, title: "Write release notes", status: "CLOSED" },
  ];
  return (
    <div className="flex flex-col md:flex-row h-dvh">
      <div className="basis-3/10 md:basis-6/10 gradian-bg border-b md:border-r border-gray-300 ">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <Image
              className="w-62.5 md:m-12"
              src={logo}
              alt="Issue tracker logo"
            />
            <div className="hidden md:block">
              <h2 className="text-4xl text-center">
                Track every issue,{" "}
                <span className="block text-gray-600 font-semibold">
                  from open to closed.
                </span>
              </h2>
              <p className="text-center text-sm md:m-8 text-gray-600!">
                Add issues, update their status, and see what still need
                <br />
                work in one clean list.
              </p>

              <Table.Root variant="surface" className="w-[85%]">
                <Table.Body>
                  {issues.map((issue) => {
                    return (
                      <Table.Row key={issue.id} className="md:flex">
                        <Table.RowHeaderCell className="md:flex-1">
                          <p>{issue.title}</p>
                        </Table.RowHeaderCell>
                        <Table.Cell>
                          <StatusBedge status={issue.status} />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-7/10 md:basis-4/10 flex justify-center items-center -mt-12.5 md:mt-0">
        <div className="flex flex-col    justify-center items-center h-full">
          <h1 className="text-3xl font-bold mb-2">Sign up or Log in</h1>
          <p className="text-sm mb-8 text-gray-400!">
            Sign in to track and manage your issues.
          </p>
          <Suspense fallback={<button disabled>Continue with Google</button>}>
            <SignInBtn />
          </Suspense>
          <p className="text-xs text-gray-500! flex items-center gap-2">
            <FaLock />
            Your data is safe, secure and fully private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
