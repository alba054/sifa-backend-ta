import { Button, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEFileMultipleOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDisabledTooltip from "src/components/fe-components/FEDisabledTooltip";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import { statusChipNoIcon } from "src/components/fe-components/FERoundedChip";
import { FEStatus } from "src/utils/const/type";

export interface IFEFacultyAdminTrialPermitVerifyProcessedDetails {
  status: FEStatus;
}

const FEFacultyAdminTrialPermitVerifyProcessedDetails: React.FC<
  IFEFacultyAdminTrialPermitVerifyProcessedDetails
> = ({ status }) => {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    if (status == "Menunggu") {
      status = "Belum_Diproses";
    }
  }, []);

  function handleAcceptApproval() {
    setIsAlertOpen(false);
    navigate(-1);
  }

  return (
    <>
      <FEAlertModal
        title="Buat Kembali Surat Permohonan?"
        description="Pastikan pilihan anda sudah BENAR"
        opened={isAlertOpen}
        setOpened={setIsAlertOpen}
        yesButtonLabel={"Buat"}
        onSubmit={handleAcceptApproval}
      />
      {/* <FEProgressBar
        progressStages={[
          "Validasi berkas dan generate surat permohonan",
          "Verifikasi dokumen oleh KTU",
          "Surat permohonan diterima",
        ]}
        currentProgress={1}
        proposalDate={"20 November 2022"}
        progressChip={statusChipNoIcon[status]}
      /> */}
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
            "Pas Foto (2:3)",
            "Transkip Nilai (Sistem SIM/Manual)",
            "Pelaporan Nilai Mata Kuliah",
            "Daftar Nilai Fisik Mata Kuliah",
          ]}
        />
      </Stack>

      <Stack className="relative pl-16 pr-8 py-8 border border-secondary-500 rounded-xl ">
        <FEFileMultipleOutline
          size={22}
          color={theme.colors["primary"][5]}
          className="absolute left-8"
        />
        <Text className="text-primary-500 font-semibold text-lg">
          Surat Permohonan Izin Ujian Sidang
        </Text>
        <FEDocumentListShowCase
          documentLabelList={["Surat Permohonan Izin Ujian Sidang"]}
        />
      </Stack>
      <FEDisabledTooltip
        label="Jika permohonan ditolak anda bisa membuat kembali surat permohonan"
        isDisabled={status == "Ditolak"}
        position="top-start"
      >
        <Button
          className="bg-primary-500 hover:bg-primary-500 text-white w-full"
          onClick={() => {
            setIsAlertOpen(true);
          }}
          disabled={status != "Ditolak"}
          variant="light"
        >
          Buat Kembali Surat Permohonan
        </Button>
      </FEDisabledTooltip>
    </>
  );
};
export default FEFacultyAdminTrialPermitVerifyProcessedDetails;
