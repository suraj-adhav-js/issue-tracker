"use cache";
import prisma from "@/prisma/client";
import { Badge, Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import StatusBedge from "../components/StatusBedge";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <div className="mb-3">
        <Button>
          <Link href="/issues/new">New</Link>
        </Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  {issue.title}{" "}
                  <div className="md:hidden">
                    <StatusBedge status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <StatusBedge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
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

export default IssuePage;
