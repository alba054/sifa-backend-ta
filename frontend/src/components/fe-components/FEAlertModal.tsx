import {
  Button,
  Group,
  Modal,
  useMantineTheme,
  Text,
  ButtonProps,
} from "@mantine/core";
import React from "react";
import { FEEllipsisQuestionMark } from "src/assets/Icons/Fluent";

interface IFEAlertModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  noButtonLabel?: string;
  yesButtonLabel?: string;
}

const FEAlertModal = ({
  opened,
  setOpened,
  title,
  description= "Data yang telah dihapus tidak dapat dikembalikan.",
  onSubmit,
  noButtonLabel = "Batal",
  yesButtonLabel = "Hapus",
}: IFEAlertModalProps) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={title}
      padding={36}
      styles={{
        modal: {
          maxWidth: "640px",
          width: "100%",
          borderRadius: "16px",
          paddingBottom: "30px !important"
        },
        title: {
          fontSize: 26,
          color: theme.colors["primary-text"][5],
          fontWeight: 700,
          paddingLeft: "60px"
        }
      }}
    >
      <FEEllipsisQuestionMark size={44} className="bg-[#FEF3C7]-100 border-8 border-[#FEF3C7] rounded-full absolute top-9"/>
      <Text className="py-[1px] text-[17px] text-secondary-text-500 pl-[60px]">{description}</Text>
      <Group mt={"md"} className="pt-2 px-8 justify-evenly gap-12" grow>
        <Button
          variant="light"
          color={"primary"}
          onClick={() => setOpened(false)}
          className="font-bold px-4 py-3 h-full rounded-md hover:bg-white"
        >
          {noButtonLabel}
        </Button>
        <Button
          className="text-white bg-primary-500 hover:bg-primary-700 font-bold px-3 py-3 h-full rounded-lg"
          onClick={onSubmit}
        >
          {yesButtonLabel}
        </Button>
      </Group>
    </Modal>
  );
};

export default FEAlertModal;
