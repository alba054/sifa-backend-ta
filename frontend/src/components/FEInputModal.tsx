import {
  Button,
  Group,
  Modal,
  useMantineTheme,
  ButtonProps,
} from "@mantine/core";
import React from "react";

interface IFEInputModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  noButtonLabel?: string;
  yesButtonLabel?: string;
  maxWidth?: number;
  onClose?: () => void;
}

const FEInputModal = ({
  opened,
  setOpened,
  title,
  onSubmit,
  children,
  noButtonLabel = "Batal",
  yesButtonLabel = "Buat Permohonan",
  maxWidth = 800,
  onClose=()=>{},
}: IFEInputModalProps) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        onClose();
      }}
      centered
      title={title}
      padding={30}
      styles={{
        modal: {
          maxWidth: `${maxWidth}px`,
          width: "100%",
          borderRadius: "12px",
        },
        title: {
          fontSize: 24,
          color: theme.colors["primary-text"][5],
          fontWeight: 700,
        },
      }}
    >
      <div className="py-2">{children}</div>
      <Group position="right" mt={"md"} className="pt-4">
        <Button
          variant="light"
          color={"primary"}
          onClick={() => setOpened(false)}
          className="font-bold hover:bg-white"
        >
          {noButtonLabel}
        </Button>
        <Button
          className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
          onClick={onSubmit}
        >
          {yesButtonLabel}
        </Button>
      </Group>
    </Modal>
  );
};

export default FEInputModal;
