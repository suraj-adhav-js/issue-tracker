"use client";

import { Status } from "@/app/generated/prisma/enums";
import { Flex, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Flex direction="column" minWidth="200px">
      <Select.Root
        defaultValue={searchParams.get("status") || ""}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          params.append("status", status);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          if (searchParams.get("order"))
            params.append("order", searchParams.get("order")!);
          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues" + query);
        }}
      >
        <Select.Trigger placeholder="Select A Filter" />

        <Select.Content position="popper">
          {statuses.map((status) => {
            return (
              <Select.Item
                key={status.value || "all"}
                value={status.value || ""}
              >
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
