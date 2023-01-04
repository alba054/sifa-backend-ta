import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline, FETrashOutline } from "src/assets/Icons/Fluent";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEFacultyAdminProposalMakingHistoryCard, {
  IFEFacultyAdminProposalMakingHistoryCard,
} from "./FEFacultyAdminProposalMakingHistoryCard";
export interface IFEFacultyAdminProposalMakingHistory {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Pembuatan",
    type: "href",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS_APPLICATION_HISTORY,
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
  {
    title: "SK Pembimbing dan Penguji",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS,
  },
  {
    title: "Pembuatan SK",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS_MAKING,
  },
];

const dummyApprovalList: Array<IFEFacultyAdminProposalMakingHistoryCard> = [
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    mentors: {
      mainMentor: "Rangga Asri S.Si., M.Si., Apt.",
      sideMentor: "Ricar",
    },
    examiners: {
      firstExaminer: "Indo Lalo S.Si., M.Si., Apt.",
      secondExaminer: "KASKJDAJKSDA",
    },
    skMentors: {
      status: "Menunggu",
    },
    skExaminers: {
      status: "Menunggu",
    },
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Cara Membuat Robot yang Bagus",
    laboratory: "DOP",
    mentors: {
      mainMentor: "Rangga Asri S.Si., M.Si., Apt.",
      sideMentor: "Ricar",
    },
    examiners: {
      firstExaminer: "Indo Lalo S.Si., M.Si., Apt.",
      secondExaminer: "KASKJDAJKSDA",
    },
    skMentors: {
      status: "Diterima",
      refusalReason: "Berkas Tidak Valid",
      repellentRole: "Kasubag",
    },
    skExaminers: {
      status: "Diterima",
    },
  },
];

const FEFacultyAdminProposalMakingHistory: React.FC<
  IFEFacultyAdminProposalMakingHistory
> = ({}) => {
  const { array: approvalList, remove, clear } = useArray(dummyApprovalList);

  const [isDataExist, setIsDataExist] = useState(
    approvalList.length > 0 ? true : false
  );
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  function endHandler(e: number) {
    remove(e);
  }

  useEffect(() => {
    if (approvalList.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [approvalList]);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Kosongkan Riwayat",
      type: "modal",
      disabled: !isDataExist,
      onClick: () => setIsAlertOpened(true),
      icon: <FETrashOutline className="mr-1" size={16} />,
    },
  ];

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Riwayat Pembuatan SK"
    >
      <FEAlertModal
        title="Kosongkan Riwayat Pembuatan SK?"
        description="Dengan mengklik tombol “Kosongkan”, semua data riwayat akan terhapus. Data yang telah dihapus tidak dapat dikembalikan"
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        yesButtonLabel={"Kosongkan"}
        onSubmit={() => {
          clear();
          setIsAlertOpened(false);
        }}
      />
      <LFPHeaderComponent title="Riwayat Pembuatan SK" buttons={buttons} />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {approvalList.map(
            (approval: IFEFacultyAdminProposalMakingHistoryCard, e: number) => {
              return (
                <FEFacultyAdminProposalMakingHistoryCard
                  key={e}
                  index={e}
                  {...approval}
                  onDelete={endHandler}
                />
              );
            }
          )}
        </Stack>
      ) : (
        <LFPEmptyDataComponent
          title="Riwayat Pembuatan SK Masih Kosong"
          caption="Belum ada mahasiswa mengajukan pembuatan SK"
          icon={
            <ManThinkingAnimation
              width={400}
              className="overflow-hidden z-[-1]"
            />
          }
        />
      )}
    </FEMainlayout>
  );
};
export default FEFacultyAdminProposalMakingHistory;
