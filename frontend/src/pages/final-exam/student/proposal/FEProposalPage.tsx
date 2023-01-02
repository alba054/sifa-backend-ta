import { Button, Group, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  DeleteOutline,
  EditOutline,
  FEClockRepeatOutline,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import {
  QF_DATA_KEYS,
  QF_LECTURE_KEY,
} from "src/query-functions/const.query-function";
import { qfGetStudentThesis } from "src/query-functions/student.query-function";
import { FEROUTES } from "src/routes/final-exam.route";
import FEDeleteProposalsButton from "./FEDeleteProposalsButton";
import { IFEProposalCard } from "./FEProposalCard";
import FEProposalMain from "./FEProposalMain";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isDeleted, refresh] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const { data, refetch: refetchThesis } = useQuery(
    QF_DATA_KEYS.THESIS,
    () => qfGetStudentThesis(),
    {}
  );
  const finalExamProposalArray = data?.data?.map((data: any, idx: number) => {
    const feProposal: IFEProposalCard = {
      laboratory: data.ref_laboratorium.labNama,
      status: data.statusPermohonan,
      title: data.taJudul,
      proposalNumber: (idx + 1).toString(),
      role: !data.pengusul ? "Mahasiswa" : data.pengusul.dsnNama,
    };
    return feProposal;
  });

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Riwayat Usulan",
      type: "href",
      href: FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL_HISTORY,
      icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
      disabled: false,
    },
    {
      label: "Buat Usulan Baru",
      type: "href",
      href: FEROUTES.STUDENT_NEW_FINAL_EXAM_PROPOSAL,
      disabled: !!finalExamProposalArray?.length,
    },
  ];

  async function handleDeletedThesis() {
    await refetchThesis();
    setIsShowPopup(true);
  }

  return (
    <>
      <FEAlertModal
        opened={isShowPopup}
        setOpened={setIsShowPopup}
        title={"Success Menghapus Proposal Tugas Akhir"}
        description={
          "Success menghapus proposal tugas akhir, silahkan tambahkan proposal kembali"
        }
        onSubmit={() => {
          refresh(true);
          setIsShowPopup(false);
        }}
        yesButtonLabel="Oke"
      />
      <FEMainlayout>
        <Stack spacing={"xl"}>
          <LFPHeaderComponent
            title="Tugas Akhir"
            buttons={buttons}
            disabledButtonTooltipLabel={
              "Hapus usulan tugas akhir yang sekarang untuk membuat usulan baru"
            }
          />
          {!isDeleted && !data?.isLoading && finalExamProposalArray?.length ? (
            <>
              <FEProposalMain finalExamProposalArray={finalExamProposalArray} />
              <FEDeleteProposalsButton
                proposalGroupId={data?.data?.[0].proposalGroupID}
                onDeleted={handleDeletedThesis}
              />
            </>
          ) : (
            <LFPEmptyDataComponent
              title="Belum Ada Pengusulan Tugas Akhir"
              caption={
                "Untuk mengusulkan judul tugas akhir, tekan tombol “Buat Usulan Baru” di pojok kanan atas."
              }
            />
          )}
        </Stack>
      </FEMainlayout>
    </>
  );
};

export default FEProposalPage;
