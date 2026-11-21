import { StatusBedge } from "@/app/components";
import { Status } from "@/app/generated/prisma/enums";
import logo from "@/public/issues-tracker.svg";
import { Table } from "@radix-ui/themes";
import Image from "next/image";

interface Issues{
  id: number,
  title: string,
  status: Status
}

const page = () => {
  const issues: Issues[] = [
    { id: 1 ,title: "Fix login redirect", status: "OPEN"},
    { id: 2 ,title: "Update dashboard layout", status: "IN_PROGRESS"},
    { id: 3 ,title: "Write release notes", status: "CLOSED"},
  ];
  return (
    <div className="flex min-h-dvh">
      <div className="border basis-6/10 ">
        <div className="border flex justify-center items-center h-full">
          <div>
            <Image src={logo} alt="Issue tracker logo" />
            <h1>Track every issue, from open to closed.</h1>
            <p>Add issues, update their status, and see what still needs work in one clean list.</p>
            <Table.Root>
              <Table.Body>
                {
                  issues.map((issue)=>{
                    return <Table.Row key={issue.id}>
                      <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
                      <Table.Cell><StatusBedge status={issue.status}/> </Table.Cell>
                    </Table.Row>
                  })
                }
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </div>
      <div className="border basis-4/10">
        <div className="border flex justify-center items-center h-full">
          <div>1</div>
        </div>
      </div>
    </div>
  );
};

export default page;
