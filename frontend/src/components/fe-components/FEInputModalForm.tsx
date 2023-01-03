import React from "react";
import FEInputModal from "../FEInputModal";

export interface IFEInputModalForm {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  onSubmitHandler: () => void;
  children: React.ReactNode;
  noButtonLabel?: string;
  yesButtonLabel?: string;
}

const FEInputModalForm: React.FC<IFEInputModalForm> = ({
  opened,
  setOpened,
  title="Alasan Melakukan Penolakan",
  noButtonLabel="Batal",
  onSubmitHandler,
  yesButtonLabel = "Lakukan Penolakan",
  children,
}) => {
  return (
    <FEInputModal
      opened={opened}
      setOpened={setOpened}
      title={title}
      noButtonLabel={noButtonLabel}
      yesButtonLabel={yesButtonLabel}
      onSubmit={onSubmitHandler as any}
      children={children}
    />
  );
};
export default FEInputModalForm;
