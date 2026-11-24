"use client";
import { User } from "@/app/generated/prisma/client";
import { Avatar, Box, Card, Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { PiUserCircleDashedLight } from "react-icons/pi";

const SelectUser = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    };
    getUsers();
  }, []);
  return (
    <Card size="3">
      <Flex direction="column">
        <h3 className="mb-3">Assignee</h3>
        <Select.Root defaultValue="null">
          <Select.Trigger />
          <Select.Content position="popper">
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              <Select.Separator />
              <Select.Item value="null">
                <div className="flex flex-row gap-2 items-center">
                  <PiUserCircleDashedLight color="gray" opacity={0.9} size="25px"/>
                  <span>Unassigned</span>
                </div>
              </Select.Item>
              {users.map((user) => {
                return (
                  <Select.Item
                    key={user.id}
                    value={user.id}
                     
                  >
                    <div className="flex items-center gap-2">
                        <Avatar
                      src={user.image!}
                      size="1"
                      radius="full"
                      fallback={user.name!.slice(0, 1)}
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
