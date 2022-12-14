import { Stack, Text } from "@mantine/core";
import React from "react";


export interface IFEFileUpload {
  title: string;
  documentInput: JSX.Element;
}

const FEFileUpload: React.FC<IFEFileUpload> = ({title, documentInput}) => {
  return (
    <Stack className="gap-2">
      <Text className="text-primary-text-500 font-semibold text-[18px] tracking-[0.0015em]">
        {title}
      </Text>
      {documentInput}
    </Stack>
  );
};
export default FEFileUpload;
