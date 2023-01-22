import {
  Modal
} from "@mantine/core";
import React from "react";

interface IFEPDFModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  maxWidth?: number;
  onClose?: () => void;
}

const FEPDFModal = ({
  opened,
  setOpened,
  title,
  children,
  maxWidth = 1000,
  onClose=()=>{},
}: IFEPDFModalProps) => {
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
          borderRadius: "6px",
        },
        title: {
          fontSize: 24,
          color: "#334155",
          fontWeight: 700,
        },
      }}
    >
      <div className="py-2">{children}</div>
    </Modal>
  );
};

export default FEPDFModal;
