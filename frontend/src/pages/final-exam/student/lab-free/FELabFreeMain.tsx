import {
  ButtonStylesParams,
  Grid,
  Group,
  MantineProvider,
  MediaQuery,
  Stack,
  Text,
  Title
} from "@mantine/core";
import React from "react";
import { InfoOutline } from "src/assets/Icons/Fluent";
import FELabFreeCardComp from "./FELabFreeCardComp";

export interface IFELabFreeMain {}

const FELabFreeMain: React.FC<IFELabFreeMain> = ({}) => {
  return (
    <Stack mt={10} spacing="md">
      <Group className="bg-[rgb(239,246,255)] rounded-xl p-5 items-start">
        <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
          <InfoOutline size={30} color={"#3B82F6"} />
        </MediaQuery>
        <Stack className="w-11/12 gap-2" >
          <Title className="text-[#3B82F6] inline" order={3}>
            <MediaQuery
              smallerThan={"lg"}
              styles={{ display: "inline !important" }}
              className="hidden relative -top-[1px] mr-2 p-[1px]"
            >
              <InfoOutline size={30} color={"#3B82F6"} />
            </MediaQuery>
            Informasi
          </Title>
          <Text className="text-md text-[#3B82F6] text-justify tracking-2">
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
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
          } as any,
        }}
        inherit
      >
        <Grid className="mt-0" gutter={"xl"}>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FELabFreeCardComp
              title="Permohonan #3"
              lab="Lab. Biofarmaka"
              status="process"
              tanggalPermohonan="14 November 2022"
            />
          </Grid.Col>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FELabFreeCardComp
              title="Permohonan #2.5"
              lab="Lab. Farmasetika"
              status="process"
              tanggalPermohonan="14 November 2022"
            />
          </Grid.Col>
          
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FELabFreeCardComp
              title="Permohonan #2"
              lab="Lab. Farmasetika"
              status="rejected"
              tanggalPermohonan="14 November 2022"
            />
          </Grid.Col>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FELabFreeCardComp
              title="Permohonan #1"
              lab="Lab. Farmakologi Toksikologi"
              status="accepted"
              tanggalPermohonan="10 November 2022"
            />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    </Stack>
  );
};
export default FELabFreeMain;
