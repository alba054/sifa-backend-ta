import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { FEFileMultipleFilled } from "src/assets/Icons/Fluent";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FEDocumentListCard from "./FEDocumentListCard";
import FESmallInformationNotification from "./FESmallInformationNotification";

export interface IFEDocumentList {
  title: string;
  // Revisi Nanti
  documentList: Array<string>;
  status?: "Lengkap" | "Belum Lengkap";
  info?: string;
}

const FEDocumentList: React.FC<IFEDocumentList> = ({
  title,
  documentList,
  status,
  info,
}) => {
  const theme = useMantineTheme();

  return (
    <Stack className="p-8 border-[1px] border-secondary-500 box-border rounded-xl drop-shadow-1 shadow-md gap-6">
      <Group>
        <Text className="text-[22px] font-bold text-primary-text-500">
          {title}
        </Text>
        {status == "Belum Lengkap" ? (
          <FERoundedChip
            type="red"
            label="Belum Lengkap"
            leftIcon={
              <FEFileMultipleFilled
                size={14}
                color={theme.colors["error"][5]}
              />
            }
          />
        ) : null}
      </Group>
      <Group className="gap-6">
        {documentList.map((documentDescription) => {
          return <FEDocumentListCard description={documentDescription} />;
        })}
      </Group>
      {info && <FESmallInformationNotification info={info} />}
    </Stack>
  );
};
export default FEDocumentList;
