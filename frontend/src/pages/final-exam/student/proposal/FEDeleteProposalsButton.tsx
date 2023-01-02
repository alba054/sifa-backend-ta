import { Group, Button } from "@mantine/core";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { EditOutline, DeleteOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { QF_DATA_KEYS } from "src/query-functions/const.query-function";
import { qfDeleteStudentThesis } from "src/query-functions/student.query-function";

interface IFEDeleteProposalsButtonProps {
  proposalGroupId: string;
  onDeleted: () => void;
}

const FEDeleteProposalsButton: React.FC<IFEDeleteProposalsButtonProps> = ({
  proposalGroupId,
  onDeleted,
}) => {
  const { mutate } = useMutation(QF_DATA_KEYS.THESIS, qfDeleteStudentThesis);
  const [alertOpened, setAlertOpened] = useState(false);

  function handleDeleteProposal() {
    mutate(proposalGroupId);
    onDeleted();
    setAlertOpened(false);
  }

  return (
    <div>
      <FEAlertModal
        opened={alertOpened}
        setOpened={setAlertOpened}
        title="Hapus Usulan?"
        description="Data yang telah dihapus tidak dapat dikembalikan."
        onSubmit={handleDeleteProposal}
      />

      <Group grow spacing={"md"}>
        <Button
          variant="light"
          className="bg-[#3B82F6] py-[10px] h-full rounded-lg text-white hover:bg-[#3B82F6]"
        >
          <EditOutline size={16} color={"white"} className="mr-2" />
          Edit Usulan
        </Button>
        <Button
          variant="light"
          className="bg-error-500 !important py-[10px] h-full rounded-lg text-white hover:bg-error-500"
          onClick={() => {
            setAlertOpened(true);
          }}
        >
          <DeleteOutline size={18} color={"white"} className="mr-2" />
          Hapus File
        </Button>
      </Group>
    </div>
  );
};
export default FEDeleteProposalsButton;
