import { Button, Group, Modal, useMantineTheme } from "@mantine/core";
import React from "react";

interface IFEInputModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  component: React.ReactNode;
}

const FEInputModal = ({
  opened,
  setOpened,
  title,
  onSubmit,
  component,
}: IFEInputModalProps) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={title}
      styles={{
        modal: {
          maxWidth: "800px",
          overflow: "hidden",
          width: "100%",
        },
        title: {
          fontSize: 24,
          fontWeight: "bold",
          color: theme.colors["primary-text"][5],
        },
        header: {
          borderBottom: `1px solid`,
          borderColor: theme.colors["secondary-text"],
          padding: "10px",
          paddingRight: "20px",
          paddingLeft: "20px",
        },
      }}
      padding={0}
    >
      <div className="p-5">{component}</div>
      <Group position="right" className={`p-5 bg-background-700`} mt={"md"}>
        <Button
          variant="subtle"
          color="primary"
          onClick={() => setOpened(false)}
        >
          Batalkan
        </Button>
        <Button color="primary" onClick={onSubmit}>
          Buat Permohonan
        </Button>
      </Group>
    </Modal>
  );
};

export default FEInputModal;
