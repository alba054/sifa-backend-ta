import { Stack, Text } from "@mantine/core";
import React from "react";

export interface IFESeminarCardComp {
  title: string;
  children: any;
}

const FESeminarCardComp: React.FC<IFESeminarCardComp> = ({ title,children }) => {
  return (
    <Stack className="pb-8 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
      <Text className="py-[14px] mx-[-32px] pl-8 mb-2 text-lg text-white font-bold tracking-[0.0015em] border-b rounded-t-xl border-secondary-500 bg-gradient-to-r to-error-400 from-primary-500">
        {title}
      </Text>
      {children}
    </Stack>
  );
};
export default FESeminarCardComp;
