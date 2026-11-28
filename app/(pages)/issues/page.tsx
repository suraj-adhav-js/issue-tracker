import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { FaArrowUpLong } from "react-icons/fa6";
import { StatusBedge } from "../../components";
import IssueActions from "./IssueActions";
import Link from "next/link";
import { connection } from "next/server";
import { Status } from "@/app/generated/prisma/enums";
import { Issue } from "@/app/generated/prisma/client";

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    order: "asc" | "desc";
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  await connection();
  const { status, orderBy, order } = await searchParams;

  const columns = [
    { label: "Issue Name", value: "title", className: "md:flex-1 " },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell md:flex-none md:min-w-32.5 text-center",
    },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell md:flex-none md:min-w-32.5 text-center",
    },
  ];

  //sanitizing url input
  const validStatus = Object.values(Status).includes(status!)
    ? status
    : undefined;
  const validOrder = order === "asc" ? "asc" : "desc";
  const validOrderBy = columns.map((col) => col.value).includes(orderBy!)
    ? { [orderBy as keyof Issue]: validOrder }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
    orderBy: validOrderBy,
  });

  return (
    <>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="md:flex">
            {columns.map((column) => {
              //checking active column
              const isActive = column.value === orderBy;

              //if col url has asc converting to desc vice versa
              let nextOrder = "asc";
              if (isActive && validOrder === "asc") {  //this block only going to run when isActive is true
                nextOrder = "desc";
              }

              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  <Link
                    href={{
                      query: {
                        status,
                        orderBy: column.value,
                        order: nextOrder,
                      },
                    }}
                    className=""
                  >
                    {column.label}
                    <FaArrowUpLong
                      className={`inline-block mb-1 transition-all duration-100 ease-in-out ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1"
                      } ${isActive && validOrder === "desc" ? "rotate-180" : ""}`}
                    />
                  </Link>
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id} className="md:flex">
                <Table.RowHeaderCell className="md:flex-1">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
