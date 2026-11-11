"use cache";
import { Table } from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from "./IssueActions";

const IssuePage = async () => {
  const issues = [0,1,2,3,4,5,6,7,8,9];

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
              <Table.Row key={issue} className="md:flex">
                <Table.RowHeaderCell className="md:flex-1"> 
                  <Skeleton /> 
                  <div className="md:hidden">
                     
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell md:flex-none md:min-w-32.5 text-center">
                  <Skeleton /> 
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell md:flex-none md:min-w-32.5" >
                  <Skeleton /> 
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
