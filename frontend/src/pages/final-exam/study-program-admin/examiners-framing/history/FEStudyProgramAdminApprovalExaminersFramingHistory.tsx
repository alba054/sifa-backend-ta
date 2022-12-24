import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FETrashOutline } from "src/assets/Icons/Fluent";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEStudyProgramAdminApprovalExaminersFramingHistoryCard, { IFEStudyProgramAdminApprovalExaminersFramingHistoryCard } from "./FEStudyProgramAdminApprovalExaminersFramingHistoryCard";
export interface IFEStudyProgramAdminApprovalExaminersFramingHistory {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
  },{
    title: "Penyusunan Tim Penguji",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_EXAMINERS_TEAM
  }
];

const dummyProposalHistoryList: Array<IFEStudyProgramAdminApprovalExaminersFramingHistoryCard> =
  [
    {
      name: "Indah Lestari",
      nim: "N011191004",
      proposalTitle:
        "Pengujian Aktivitas Antioksidan dan Analisis Mikrobiologi terhadap Lama Waktu Penyimpanan Teh Daun Gaharu (Aquilaria Malaccensis Lamk.) dalam Kemasan Siap Minum ",
      laboratory: "Kimia Farmasi",
      laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
      mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
      sideMentor: "Prof. Dr. Jack Sully.",
      proposedFirstExaminers: {
        name: "Prof. Dr. M.Natsir Djide, M.S.",
        approvalStatus: "accepted",
      },
      proposedSecondExaminers: {
        name: "Drs. Kus Haryono, MS.",
        approvalStatus: "accepted",
      },
    },
    {
      name: "Devi Selfira",
      nim: "N011181001",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      laboratory: "Kimia Farmasi",
      laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
      mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
      sideMentor: "Prof. Dr. Jack Sully.",
      proposedFirstExaminers: {
        name: "Prof. Dr. Jack Sully",
        approvalStatus: "accepted",
      },
      proposedSecondExaminers: {
        name: "Drs. Kus Haryono, MS.",
        approvalStatus: "accepted",
      },
    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      proposalTitle: "Penerapan Machine Learning untuk Lab",
      laboratory: "Farmasi",
      laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
      mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
      sideMentor: "Prof. Dr. Jack Sully.",
      proposedFirstExaminers: {
        name: "Prof. Dr. Jack Sully",
        approvalStatus: "accepted",
      },
      proposedSecondExaminers: {
        name: "Drs. Kus Haryono, MS.",
        approvalStatus: "accepted",
      },
    },
  ];

const FEStudyProgramAdminApprovalExaminersFramingHistory: React.FC<
  IFEStudyProgramAdminApprovalExaminersFramingHistory
> = ({}) => {
  const { array: proposalHistoryList, remove, clear } = useArray(dummyProposalHistoryList);
  const navigate = useNavigate();

  const [isDataExist, setIsDataExist] = useState(
    proposalHistoryList.length > 0 ? true : false
  );

  const [isAlertOpened, setIsAlertOpened] = useState(false)

  function onDelete(index: number) {
    remove(index)
    // console.log(nim);
    // navigate(`${nim}`);
    // window.scrollTo(0, 0);
    // remove(index);
  }

  useEffect(() => {
    if (proposalHistoryList.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [proposalHistoryList]);

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
      breadCrumbsCurrentPage="Riwayat Penyusunan Tim Penguji"
    > 
    
    <FEAlertModal
        title="Kosongkan Riwayat Penyusunan?"
        description="Dengan mengklik tombol “Kosongkan”, semua data riwayat akan terhapus. Data yang telah dihapus tidak dapat dikembalikan"
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        yesButtonLabel={"Kosongkan"}
        onSubmit={() => {
          clear();
          setIsAlertOpened(false);
        }}
      />
      <LFPHeaderComponent title="Riwayat Penyusunan Tim Penguji" buttons={buttons} 
        disabledButtonTooltipLabel={"Riwayat kosong"} />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {proposalHistoryList.map(
            (
              proposal: IFEStudyProgramAdminApprovalExaminersFramingHistoryCard,
              e: number
            ) => {
              return (
                <FEStudyProgramAdminApprovalExaminersFramingHistoryCard
                  key={e}
                  index={e}
                  onDelete={(e: number) => {
                    onDelete(e);
                  }}
                  {...proposal}
                />
              );
            }
          )}
        </Stack>
      ) : (
        (
          <LFPEmptyDataComponent
          title="Riwayat Penyusunan Kosong"
          caption="Belum ada riwayat penyusunan tim penguji yang diajukan"
            icon={
              <ManThinkingAnimation
                width={400}
                className="overflow-hidden z-[-1]"
              />
            }
          />
        ))}
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminApprovalExaminersFramingHistory;
