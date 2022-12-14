import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import FEDocumentListCard from "./FEDocumentListCard";

export interface IFEDocumentListShowCase {
  documentLabelList: Array<string>;
}

const FEDocumentListShowCase: React.FC<IFEDocumentListShowCase> = ({
  documentLabelList,
}) => {
  return (
    <Group className="gap-2">
      {/*lineClamp={1}}*/} 
      {documentLabelList.map((document: string, idx: number) => {
        return (
          <Stack className="gap-2 w-40 self-end">
            
            <Text className="text-primary-text-500 font-semibold text-left" >{document}</Text>
            <FEDocumentListCard key={idx} description={document} />
          </Stack>
        );
      })}
    </Group>
  );
};
export default FEDocumentListShowCase;
