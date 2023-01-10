import { Button, Group, Stack, Title } from "@mantine/core";
import moment from "moment";
import React from "react";
import { DeletFilled } from "src/assets/Icons/Fluent";

interface IFEGuidanceListItemProps {}

export interface IFEGuidanceHistory {
  id: number;
  ts: number;
  user: string;
  fileUrl?: string;
  comment?: string;
  comments?: IFEGuidanceHistory[];
}

export const FEGuidanceListItem: React.FC<{ history: IFEGuidanceHistory }> = ({
  history,
}) => {
  return (
    <Stack className="p-4">
      <Title order={2} weight="bold">
        {moment(history.ts).format("DD MMMM YYYY")}
      </Title>
      <Group spacing={4}>
        {!!history.fileUrl && (
          <Button size="xs" className={`!py-1 !px-2`} color={"error"}>
            <DeletFilled color="#fff" size={20} />
          </Button>
        )}

        <Title order={4} weight={"bold"}>
          {history.user} | {moment(history.ts).format("HH:mm:ss")}
        </Title>
      </Group>

      {!!history.fileUrl ? (
        <a href={history.fileUrl} target={"_blank"}>
          <Title order={3} color="primary">
            File Dokumen
          </Title>
        </a>
      ) : (
        <Title order={4}>{history.comment}</Title>
      )}
    </Stack>
  );
};

export default FEGuidanceListItem;
