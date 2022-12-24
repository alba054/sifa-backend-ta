import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEStudyProgramAdminApprovalExaminersFramingCard, { IFEStudyProgramAdminApprovalExaminersFramingCard } from "./FEStudyProgramAdminApprovalExaminersFramingCard";
export interface IFEStudyProgramAdminApprovalExaminersFraming {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Persetujuan",
    type: "href",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL_APPLICATION_HISTORY,
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

const dummyProposalList: Array<IFEStudyProgramAdminApprovalExaminersFramingCard> = [
  {
    name: "Indah Lestari",
    nim: "N011191004",
    proposalTitle: "Pengujian Aktivitas Antioksidan dan Analisis Mikrobiologi terhadap Lama Waktu Penyimpanan Teh Daun Gaharu (Aquilaria Malaccensis Lamk.) dalam Kemasan Siap Minum ",
    laboratory: "Kimia Farmasi",
  },
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Penerapan Machine Learning untuk Lab",
    laboratory: "Farmasi",
  },
];

const FEStudyProgramAdminApprovalExaminersFraming: React.FC<
  IFEStudyProgramAdminApprovalExaminersFraming
> = ({}) => {
  const { array: proposalList, remove } = useArray(dummyProposalList);

  const [isDataExist, setIsDataExist] = useState(
    proposalList.length > 0 ? true : false
  );

  function handleSubmit() {
    console.log('a')
    // console.log(index, acceptedProposal, approvalResult)
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
        buttons={buttons}
      />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {proposalList.map((proposal: IFEStudyProgramAdminApprovalExaminersFramingCard, e: number) => {
            return (
              <FEStudyProgramAdminApprovalExaminersFramingCard
                key={e}
                onClick={handleSubmit}
                {...proposal}
              />
            );
          })}
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
export default FEStudyProgramAdminApprovalExaminersFraming;
