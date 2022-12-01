import { Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useCurrentTime from "src/hooks/fe-hooks/useCurrentTime";

export interface IFEDateChip {}

const FEDateChip: React.FC<IFEDateChip> = ({}) => {
  const [dateString, setDateString] = useState<string>("")
  
  useEffect(() => {
    const currentTime= useCurrentTime() 
    setDateString(currentTime);
  }, []);

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
