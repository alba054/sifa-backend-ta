import { Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEStudyProgramAdminProposalSubmissionCard, {
  IFEStudyProgramAdminProposalSubmissionCard
} from "./FEStudyProgramAdminProposalSubmissionCard";

export interface IFEStudyProgramAdminProposalSubmission {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Pengajuan",
    type: "href",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL_SUBMISSION_HISTORY,
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
  },
  {
    title: "Judul Penelitian",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL,
  },
];

const dummyApprovalList: Array<IFEStudyProgramAdminProposalSubmissionCard> = [
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    proposer: "Mahasiswa (Devi Selfira)",
    entryDate: "15 November 2022",
    completionDate: "29 November 2022",
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Penerapan Machine Learning untuk Lab",
    laboratory: "Farmasi",
    proposer: "Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)",
    entryDate: "15 Oktober 2022",
    completionDate: "19 Oktober 2022",
  },
];

const FEStudyProgramAdminProposalSubmission: React.FC<
  IFEStudyProgramAdminProposalSubmission
> = ({}) => {
  const { array: approvalList, remove } = useArray(dummyApprovalList);

  const [isDataExist, setIsDataExist] = useState(
    approvalList.length > 0 ? true : false
  );

  function handleSubmit(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (approvalList.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [approvalList]);

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Pengajuan Judul Penelitian"
    >
      <LFPHeaderComponent
        title="Pengajuan Judul Penelitian"
        buttons={buttons}
      />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          <FEInformationNotification
            description={
              <Text>
                Semua judul di bawah telah disetujui oleh pihak fakultas. Tekan
                tombol “
                <Text className="font-bold inline-block">Buat Permohonan</Text>”
                untuk menandatangani dokumen disposisi untuk dikirim ke kepala
                lab yang bersangkutan.
              </Text>
            }
          />
          {approvalList.map(
            (
              approval: IFEStudyProgramAdminProposalSubmissionCard,
              e: number
            ) => {
              return (
                <FEStudyProgramAdminProposalSubmissionCard
                  key={e}
                  index={e}
                  {...approval}
                  onClick={handleSubmit}
                />
              );
            }
          )}
        </Stack>
      ) : (
        <LFPEmptyDataComponent
          title="Belum Ada Usulan Persetujuan Terbaru"
          caption="Usulan persetujuan yang telah disetujui berada di “History Persetujuan” di pojok kanan atas"
        />
      )}
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminProposalSubmission;
