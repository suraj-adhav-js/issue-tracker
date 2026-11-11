"use cache";
import prisma from "@/prisma/client";
import { Badge, Button, Table } from "@radix-ui/themes";
import StatusBedge from "../components/StatusBedge";
import delay from 'delay'
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  
  const issues = await prisma.issue.findMany();

  return (
    <>
      <IssueActions/>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="md:flex">
            <Table.ColumnHeaderCell className="md:flex-1 ">Issue Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell md:flex-none md:min-w-32.5 text-center">
              Status
            </Table.ColumnHeaderCell> 
            <Table.ColumnHeaderCell className="hidden md:table-cell md:flex-none md:min-w-32.5 text-center">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id} className="md:flex">
                <Table.RowHeaderCell className="md:flex-1"> 
                  {issue.title}{" "}
                  <div className="md:hidden">
                    <StatusBedge status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell md:flex-none md:min-w-32.5 text-center">
                  <StatusBedge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell md:flex-none">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
