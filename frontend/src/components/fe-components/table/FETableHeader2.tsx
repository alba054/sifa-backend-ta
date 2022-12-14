import { Stack, Text } from "@mantine/core";
import React from "react";

export interface IFETableHeader2 {
  title: string;
  children: any;
  paddingX? : string 
}

const FETableHeader2: React.FC<IFETableHeader2> = ({ title,children, paddingX="px-8" }) => {
  const paddingVal= (paddingX!==undefined? paddingX.match(/\d+/)![0] : "")
  const marginX= `-mx-${paddingVal}`

  return (
    <Stack className={`pb-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md `+(paddingX)}>
      <Text className={`py-[14px] pl-8 mb-2 text-lg text-white font-bold tracking-[0.0015em] border-b rounded-t-xl border-secondary-500 bg-gradient-to-r to-error-400 from-primary-500 `+marginX}>
        {title}
      </Text>
      {children}
    </Stack>
  );
};
export default FETableHeader2;
