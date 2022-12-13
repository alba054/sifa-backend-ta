import { Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";


export interface IFESeminarFileUpload {
  title: string;
  documentInput: JSX.Element;
}

const FESeminarFileUpload: React.FC<IFESeminarFileUpload> = ({title, documentInput}) => {
  const theme = useMantineTheme();
  return (
    <Stack className="gap-2">
      <Text className="text-primary-text-500 font-semibold text-[17px] tracking-[0.0015em]">
        {title}
      </Text>
      {documentInput}
    </Stack>
  );
};
export default FESeminarFileUpload;

{/* <FESeminarFileUpload title="Pelaporan PD-Dikti" isFileUploaded={true} fileName="bukti_pelaporan_PD_Dikti.pdf" />
            <FESeminarFileUpload title="Ijazah Terakhir" />
            <FESeminarFileUpload title="Transkrip Nilai" />
            <FESeminarFileUpload title="Pas Foto Hitam Putih" />
            <FESeminarFileUpload title="Pelaporan Nilai Mata Kuliah pada Sistem APPS" />
            <FESeminarFileUpload title="Daftar Nilai Fisik Mata Kuliah pada Sistem APPS" /> */}
