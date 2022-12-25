import { Group, Text } from "@mantine/core";
import React, { useState } from "react";
import useCurrentTime from "src/hooks/fe-hooks/useCurrentTime";

export interface IFEDateChip {
  date?: string;
}

const FEDateChip: React.FC<IFEDateChip> = ({ date = "" }) => {
  const [dateString, setDateString] = useState<string>(
    date || useCurrentTime()
  );

  return (
    <Group position="right" my={-20} className="">
      <div className="bg-[#5f5af71a] py-2 px-4 rounded-full">
        <Text color={"secondary-text"} size="sm">
          Terakhir diakses pada {dateString}{" "}
        </Text>
      </div>
    </Group>
  );
};

export default FEDateChip;
