import React from "react";
import { Status } from "../generated/prisma/enums";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: Status;
  className?: string
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "orange" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
  CLOSED: { label: "Closed", color: "green" },
};

const StatusBedge = ({ status, className }: Props) => {
  return (
    <Badge color={statusMap[status].color} className={className}>{statusMap[status].label}</Badge>
  );
};

export default StatusBedge;
