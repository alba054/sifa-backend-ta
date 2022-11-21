import { Stack, Title } from "@mantine/core";
import React, { useState } from "react";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import NoFilesAnimationIcon from "src/assets/Icons/NoFilesAnimationIcon";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import FEProposalHistoryMain from "./FEProposalHistoryMain";

export interface IFEProposalHistory {}

const FEProposalHistory: React.FC<IFEProposalHistory> = ({}) => {
  const [isHistoryExist, setIsHistoryExist] = useState(true)

  return (
    <FEStudentMainlayout>
      <Stack spacing={"xl"}>
        <Title order={2}>Riwayat Usulan Tugas Akhir</Title>
        {isHistoryExist ? (
          <FEProposalHistoryMain />
        ) : (
          <LFPEmptyDataComponent
            title="Riwayat Usulan Masih Kosong"
            caption={
              "Anda belum mengusulkan satupun judul tugas akhir."
            }
            icon={<ManThinkingAnimation width={400} className="overflow-hidden z-[-1]" />}

          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FEProposalHistory;
