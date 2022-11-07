import { Group, Button, Title } from "@mantine/core";

import React from "react";
import { AddFilled } from "src/assets/Icons/Fluent";

interface ILFGHeaderComponentProps {
  title: string;
  onClick: () => void;
  addButtonLabel: string;
}

const LFPHeaderComponent: React.FC<ILFGHeaderComponentProps> = ({
  title,
  onClick,
  addButtonLabel,
}) => {
  return (
    <Group position="apart">
      <Title /* order={2} */>{title}</Title>
      <Button variant="outline" color="primary-text" className="h-[46px] gap-[8px] py-[12px] px-[16px] border-[1px] border-[#CACCCE] rounded-[8px] font-bold" onClick={onClick}>
        <AddFilled className={`mr-1 mb-[1px]`} size={14} />
        {addButtonLabel}
      </Button>
    </Group>
  );
};
export default LFPHeaderComponent;
