import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  FECloudUpload,
  FESquareOut,
  FETrashOutline,
} from "src/assets/Icons/Fluent";

export interface IFESeminarFileUpload {
  title: string;
  isFileUploaded?: boolean;
  fileName?: string;

}

const FESeminarFileUpload: React.FC<IFESeminarFileUpload> = ({title, isFileUploaded=false, fileName=''}) => {
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    setIsUploaded(isFileUploaded)
  }, [])
  

  const theme = useMantineTheme();
  return (
    <Stack className="gap-4">
      <Text className="text-primary-text-500 font-semibold text-xl tracking-[0.0015em]">
        {title}
      </Text>
      <Stack className="items-center gap-[1px] border-2 border-[#B5C2D1] p-5 rounded-xl border-dashed">
        <FECloudUpload
          color={theme.colors["secondary"][7]}
          size={30}
          className="m-[10px]"
        />
        <Text className="text-primary-text-500 text-lg tracking-[0.0015em]">
          {isUploaded? fileName : "Seret dan tempatkan file ke sini, atau klik untuk memilih file." }
        </Text>
        <Text className="text-secondary-text-500 text-base tracking-[0.0025em]">
          Ekstensi file PDF, ukuran file maksimal 3 MB.
        </Text>
      </Stack>
      {isUploaded ? (
        <Group grow spacing={"lg"} className="mt-2">
          <Button
            variant="light"
            className="bg-[#3B82F6] py-3 h-full rounded-lg text-white hover:bg-[#3B82F6]"
          >
            <FESquareOut size={18} color={"white"} className="mr-2" />
            Lihat Pratinjau
          </Button>
          <Button
            variant="light"
            className="bg-error-500 !important py-3 h-full rounded-lg text-white hover:bg-error-500"
          >
            <FETrashOutline size={18} color={"white"} className="mr-2" />
            Hapus File
          </Button>
        </Group>
      ) : null}
    </Stack>
  );
};
export default FESeminarFileUpload;
