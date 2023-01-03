import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFEApprovalDetailsCard } from "../../../../../../components/fe-components/FEApprovalDetailsCard";
import FEFacultyAdminProposalApplicationCard, {
  IFEFacultyAdminProposalApplicationCard,
} from "./FEFacultyAdminProposalApplicationCard";

export interface IFEFacultyAdminProposalApplication {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Persetujuan",
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
];

const dummyApprovalList: Array<IFEFacultyAdminProposalApplicationCard> = [
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    proposer: "Dosen",
    proposerName: "Ricar Enrico ST"
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Cara Membuat Robot yang Bagus",
    laboratory: "DOP",
    proposer: "Mahasiswa",
  },
];

const FEFacultyAdminProposalApplication: React.FC<
  IFEFacultyAdminProposalApplication
> = ({}) => {
  const { array: approvalList, remove } = useArray(dummyApprovalList);

  const [isDataExist, setIsDataExist] = useState(
    approvalList.length > 0 ? true : false
  );

  function handleSubmit(
    index: number,
    acceptedProposal: any,
    approvalResult: string,
    refusalReason: null | string
  ) {
    console.log(index, acceptedProposal, approvalResult, refusalReason);
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
      breadCrumbsCurrentPage="Persetujuan Permohonan Judul"
    >
      <LFPHeaderComponent
        title="Persetujuan Permohonan Judul"
        buttons={buttons}
      />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {approvalList.map(
            (approval: IFEFacultyAdminProposalApplicationCard, e: number) => {
              return (
                <FEFacultyAdminProposalApplicationCard
                  key={e}
                  index={e}
                  {...approval}
                  to={approval.nim}
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
export default FEFacultyAdminProposalApplication;
