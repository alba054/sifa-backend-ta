import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEFileMultipleOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";

export interface IFESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails {
  setStatus: React.Dispatch<any>;
  // File Di sini?
}

const FESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails: React.FC<
  IFESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails
> = ({setStatus}) => {
  const navigate = useNavigate();
  const [isOpenAcceptAlertModal, setIsOpenAcceptAlertModal] = useState(false);
  const [isOpenRefuseAlertModal, setIsOpenRefuseAlertModal] = useState(false);
  const theme = useMantineTheme();

  function handleRefuseApproval() {
    setStatus("Ditolak")
    setIsOpenRefuseAlertModal(false);
  }

  function handleAcceptApproval() {
    setIsOpenAcceptAlertModal(false);
    setStatus("Diterima")
  }

  return (
    <>
      <FEAlertModal
        title="Tolak Usulan"
        description="Usulan yang ditolak tidak dapat dikembalikan"
        opened={isOpenRefuseAlertModal}
        setOpened={setIsOpenRefuseAlertModal}
        yesButtonLabel={"Tolak"}
        onSubmit={handleRefuseApproval}
      />

      <FEAlertModal
        title="Buat Surat Permohonan"
        description="Pastikan pilihan anda sudah BENAR"
        opened={isOpenAcceptAlertModal}
        setOpened={setIsOpenAcceptAlertModal}
        yesButtonLabel={"Buat"}
        onSubmit={handleAcceptApproval}
      />
      <Stack className="relative pl-16 pr-8 py-8 border border-secondary-500 rounded-xl ">
        <FEFileMultipleOutline
          size={22}
          color={theme.colors["primary"][5]}
          className="absolute left-8"
        />
        <Text className="text-primary-500 font-semibold text-lg">
          Berkas Persyaratan Izin Ujian Sidang
        </Text>
        <FEDocumentListShowCase
          documentLabelList={[
            "Pelaporan PD-Dikti",
            "Bukti Klirins SPP/UKT",
            "Ijazah Terakhir",
            "Transkip Nilai",
            "Pelaporan Nilai Mata Kuliah",
            "Daftar Nilai Fisik Mata Kuliah",
          ]}
        />
      </Stack>
      <Group mt={"md"} className="pt-4" grow>
        <Button
          variant="light"
          className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
          onClick={() => {
            setIsOpenAcceptAlertModal(() => {
              return true;
            });
          }}
        >
          Setujui Usulan
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setIsOpenRefuseAlertModal(() => {
              return true;
            });
          }}
          className="text-white bg-error-500 hover:bg-error-500 font-bold"
        >
          Tolak Usulan
        </Button>
      </Group>
    </>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails;
