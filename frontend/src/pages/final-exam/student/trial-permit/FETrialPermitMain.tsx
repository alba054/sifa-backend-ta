import { Button, Group, Stack } from "@mantine/core";
import React, { useState } from "react";
import { DeleteOutline, EditOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDocumentList from "src/components/fe-components/FEDocumentList";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import { FEStatus } from "src/utils/const/type";

export interface IFETrialPermitMain {
  applicationDate: string,
  status: FEStatus,
  currentProgress: number,
  editPermit: ((e:boolean)=>void)
  deletePermit: (()=>void)
}


const FETrialPermitMain: React.FC<IFETrialPermitMain> = ({applicationDate, status, currentProgress, editPermit, deletePermit}) => {
  
  const [alertOpened, setAlertOpened] = useState(false);

  function handleDeleteTrialPermit(){
    deletePermit()
  }

  return (
    <Stack className="gap-8">
      <FEAlertModal
        opened={alertOpened}
        setOpened={setAlertOpened}
        title="Hapus Izin Ujian Sidang?"
        description="Data yang telah dihapus tidak dapat dikembalikan."
        onSubmit={handleDeleteTrialPermit}
      />
      <FEProgressBar
        progressStages={[
          "Permohonan Dibuat",
          "Validasi Berkas",
          "Pembuatan Surat",
          "Penyerahan Surat/Berkas",
          "Penandatangan Surat",
          "Surat diterima",
        ]}
        currentProgress={currentProgress}
        proposalDate={applicationDate}
      />
      <FEDocumentList title="Surat Izin Ujian Sidang" documentList={['Surat Izin Ujian Sidang']} info="Dokumen akan diberikan jika permohonan diterima." />
      <Group grow spacing={"md"}>
        <Button
          variant="light"
          className="bg-[rgb(59,130,246)] py-[10px] h-full rounded-lg text-white hover:bg-[#3B82F6]"
          onClick={(()=>{editPermit(true)}) as any}
          disabled={status!=='Belum_Diproses'}
        >
          <EditOutline size={16} color={"white"} className="mr-2" />
          Edit Permohonan
        </Button>
        <Button
          variant="light"
          className="bg-error-500 !important py-[10px] h-full rounded-lg text-white hover:bg-error-500"
          onClick={() => {
            setAlertOpened(true);
          }}
          disabled={status==='Diterima'}
        >
          <DeleteOutline size={18} color={"white"} className="mr-2" />
          Hapus Permohonan
        </Button>
      </Group>
    </Stack>
  );
};
export default FETrialPermitMain;
