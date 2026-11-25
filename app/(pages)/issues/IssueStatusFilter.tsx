"use status";

import { Status } from "@/app/generated/prisma/enums";
import { Flex, Select } from "@radix-ui/themes";
import { TbArrowsSort } from "react-icons/tb";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Flex direction="column" minWidth="200px">
      <Select.Root>
        <Select.Trigger placeholder="Select A Filter"/>
         
        <Select.Content position="popper">
          {statuses.map((status) => {
            return (
              <Select.Item key={status.value || "all"} value={status.value || ""}>
                {status.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default IssueStatusFilter;
