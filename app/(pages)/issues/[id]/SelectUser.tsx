"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@/app/generated/prisma/client";
import { Avatar, Card, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PiUserCircleDashedLight } from "react-icons/pi";

const SelectUser = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const generateInitial = (user: string = "??") => {
    return user
      ?.split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading)
    return (
      <Card size="3">
        <Skeleton />
      </Card>
    );

  if (error) return null;

  return (
    <Card size="3">
      <Flex direction="column">
        <h3 className="mb-3">Assignee</h3>
        <Select.Root
          defaultValue={issue.assignedToUserId || " "}
          onValueChange={(user) =>
            axios.patch("/api/issues/" + issue.id, {
              assignedToUserId: user || null,
            })
          }
        >
          <Select.Trigger />
          <Select.Content position="popper">
            <Select.Group>
              <Select.Label className="p-0 m-0">Suggestion</Select.Label>
              <Select.Separator />
              <Select.Item value=" ">
                <div className="flex flex-row gap-2 items-center">
                  <PiUserCircleDashedLight
                    color="gray"
                    opacity={0.9}
                    size="25px"
                  />
                  <span>Unassigned</span>
                </div>
              </Select.Item>
              {users?.map((user) => {
                return (
                  <Select.Item key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={user.image!}
                        size="1"
                        radius="full"
                        fallback={generateInitial(user.name!)}
                        className=" border border-gray-300"
                      ></Avatar>
                      <span className="capitalize">{user.name}</span>
                    </div>
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Card>
  );
};

export default SelectUser;
