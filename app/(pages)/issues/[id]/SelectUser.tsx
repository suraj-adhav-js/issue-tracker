"use client";
import { Card, Flex, Select } from "@radix-ui/themes";

const SelectUser = () => {
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
              <Select.Item value="null">Unassigned</Select.Item>
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="grape">Grape</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Card>
  );
};

export default SelectUser;
