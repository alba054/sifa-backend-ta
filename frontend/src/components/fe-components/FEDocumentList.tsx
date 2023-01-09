import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { FEFileMultipleFilled } from "src/assets/Icons/Fluent";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import { string } from "yup";
import FEDocumentListCard from "./FEDocumentListCard";
import FESmallInformationNotification from "./FESmallInformationNotification";

export interface IFEDocumentList {
  title: string;
  // Revisi Nanti
  documentList: Array<string>;
  status?: "Lengkap" | "Belum Lengkap";
  info?: string;
  px?: string;
  py?: string;
  titleSize?: string;
  dropShadow?: boolean;
  withBorder?: boolean;
}

const FEDocumentList: React.FC<IFEDocumentList> = ({
  title,
  documentList,
  status,
  info,
  px = "px-8",
  py = "py-8",
  titleSize = "text-[22px]",
  dropShadow,
  withBorder = true,
}) => {
  const theme = useMantineTheme();

  return (
    <Stack
      className={`${px || "px-8"} ${py || "py-8"} ${
        withBorder ? "border" : ""
      } border-secondary-500 box-border rounded-xl gap-6 ${
        dropShadow ? "drop-shadow-1 shadow-md" : ""
      }`}
    >
      <Group>
        <Text
          className={`${
            titleSize || "text-[22px]"
          } font-bold text-primary-text-500`}
        >
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
        {documentList.map((documentDescription: any, e: number) => {
          return (
            <FEDocumentListCard key={e} description={documentDescription} />
          );
        })}
      </Group>
      {info && <FESmallInformationNotification info={info} />}
    </Stack>
  );
};
export default FEDocumentList;
