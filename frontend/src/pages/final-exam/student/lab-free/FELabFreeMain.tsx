import {
  Grid,
  Group,
  MantineProvider,
  MediaQuery,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { InfoOutline } from "src/assets/Icons/Fluent";
import FELabFreeCardComp from "./FELabFreeCardComp";

export interface IFELabFreeMain {}

const FELabFreeMain: React.FC<IFELabFreeMain> = ({}) => {
  return (
    <Stack mt={24} spacing="xl">
      <Group className="bg-[rgb(239,246,255)] rounded-xl p-[28px] pl-[30px] items-start">
        <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
          <InfoOutline size={36} color={"#3B82F6"} />
        </MediaQuery>

        <Stack className="w-11/12">
          <Title className="text-[22px] font-semibold text-[#3B82F6] mt-1">
            Informasi
          </Title>
          <Text className="text-[16px] font-semibold text-[#3B82F6]">
            Setelah mengajukan permohonan, tunggu hingga Kepala Laboratorium
            yang bersangkutan mengecek permohonan Anda.{" "}
            <Text className="font-extrabold inline">Jika diterima</Text>,
            silahkan download surat hasil permohonan.{" "}
            <Text className="font-extrabold inline">Jika ditolak</Text>,
            silahkan lakukan pengajuan ulang jika berkenan.
          </Text>
        </Stack>
      </Group>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            sm: 800,
            md: 1000,
          },
        }}
      >
        <Grid className="mt-2" gutter={"xl"}>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FELabFreeCardComp title="Permohonan #3" lab="Lab. Biofarmaka" status="process" tanggalPermohonan="14 November 2022" />
          </Grid.Col>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FELabFreeCardComp title="Permohonan #2" lab="Lab. Farmasetika" status="rejected" tanggalPermohonan="14 November 2022" />
          </Grid.Col>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FELabFreeCardComp title="Permohonan #1" lab="Lab. Farmakologi Toksikologi" status="accepted" tanggalPermohonan="10 November 2022" />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    </Stack>
  );
};
export default FELabFreeMain;
