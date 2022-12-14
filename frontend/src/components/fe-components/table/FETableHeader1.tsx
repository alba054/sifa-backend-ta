import { Stack, Text } from "@mantine/core";
import React from "react";

export interface IFETableHeader1 {
  title: string;
  children: any;
}

const FETableHeader1: React.FC<IFETableHeader1> = ({ title, children }) => {
  return (
    <div
      className={`pt-[10px] shadow rounded-xl bg-gradient-to-r to-error-400 from-primary-500 !important drop-[0_1px_4px_rgba(0,0,0,0.12)]`}
    >
      <Stack className="pb-4 border-[1px]-secondary-500 box-border shadow-md bg-white border-x border-secondary-500 rounded-b-xl">
        <Text className="py-3 px-8 mb-1 text-[18px] text-primary-text-500 font-semibold tracking-[0.0015em] border-b border-secondary-500 bg-white">
          {title}
        </Text>
        {children}
      </Stack>
    </div>
  );
};
export default FETableHeader1;
