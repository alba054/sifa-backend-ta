import { Stack, Title } from '@mantine/core';
import React, { useState } from 'react';
import ManThinkingAnimation from 'src/assets/Icons/ManThinkingAnimation';
import { IFEBreadCrumbsItem } from 'src/components/fe-components/FEBreadCrumbs';
import LFPEmptyDataComponent from 'src/components/fe-components/LFPEmptyData.component';
import FEStudentMainlayout from 'src/layouts/final-exam/student/FEStudentMainlayout';
import { FEROUTES } from 'src/routes/final-exam.route';

export interface IFESeminarHistory {}

const breadCrumbs : Array<IFEBreadCrumbsItem> = [
  {
    title: 'Seminar',
    href: FEROUTES.SEMINAR
  },
]

const FESeminarHistory: React.FC<IFESeminarHistory> = ({ }) => {
  const [isHistoryExist, setIsHistoryExist] = useState(true)

  return (
    <FEStudentMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage='Riwayat Seminar' >
      <Stack spacing={"xl"}>
        <Title order={2}>Riwayat Seminar</Title>
        {isHistoryExist ? (
          // <FEProposalHistoryMain finalExamProposalHistoryArray={finalExamProposalHistoryArray} handleDeleteFinalExamProposalHistory={remove} />
          <div>Ada</div>
          ) : (
          <LFPEmptyDataComponent
            title="Riwayat Seminar Masih Kosong"
            caption={
              "Riwayat seminar Anda akan ditampilkan di sini."
            }
            icon={<ManThinkingAnimation width={400} className="overflow-hidden z-[-1]" />}

          />
        )}
      </Stack>
    </FEStudentMainlayout>  
  )
}
export default FESeminarHistory;