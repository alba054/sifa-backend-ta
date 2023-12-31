import { Divider, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEStudyProgramAdminApprovalExaminersFramingCard, {
  IFEStudyProgramAdminApprovalExaminersFramingCard,
} from "./FEStudyProgramAdminApprovalExaminersFramingCard";
import FEStudyProgramAdminApprovalExaminersFramingHistory from "./history/FEStudyProgramAdminApprovalExaminersFramingHistory.section";
export interface IFEStudyProgramAdminApprovalExaminersFraming {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Penyusunan",
    type: "href",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_EXAMINERS_TEAM_HISTORY,
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
  },
];

const dummyProposalList: Array<IFEStudyProgramAdminApprovalExaminersFramingCard> =
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
        approvalStatus: "Diterima",
      },
      proposedSecondExaminers: {
        name: "Drs. Kus Haryono, MS.",
        approvalStatus: "Diterima",
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
        approvalStatus: "Belum_Diproses",
      },
      proposedSecondExaminers: {
        name: "Drs. Kus Haryono, MS.",
        approvalStatus: "Ditolak",
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
    },
  ];

const FEStudyProgramAdminApprovalExaminersFraming: React.FC<
  IFEStudyProgramAdminApprovalExaminersFraming
> = ({}) => {
  const { array: proposalList, remove } = useArray(dummyProposalList);
  const navigate = useNavigate();

  const [isDataExist, setIsDataExist] = useState(
    proposalList.length > 0 ? true : false
  );

  function onDelete(index: number) {
    remove(index);
    // console.log(nim);
    // navigate(`${nim}`);
    // window.scrollTo(0, 0);
    // remove(index);
  }

  useEffect(() => {
    if (proposalList.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [proposalList]);

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Penyusunan Tim Penguji"
    >
      <LFPHeaderComponent
        title="Penyusunan Tim Penguji"
        // buttons={buttons}
      />

      <Stack mt={"md"} className="gap-12">
        {isDataExist ? (
          <Stack className="gap-6">
            {proposalList.map(
              (
                proposal: IFEStudyProgramAdminApprovalExaminersFramingCard,
                e: number
              ) => {
                return (
                  <FEStudyProgramAdminApprovalExaminersFramingCard
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
          <LFPEmptyDataComponent
            title="Belum Ada Permintaan Penyusunan Tim Penguji"
            caption="Riwayat penyusunan tim penguji yang telah disetujui berada di “History Penyusunan di pojok kanan atas"
          />
        )}
        <Divider />
        <FEStudyProgramAdminApprovalExaminersFramingHistory />
      </Stack>
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminApprovalExaminersFraming;
