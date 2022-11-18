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
    <Stack mt={24} spacing="xl">
      <Group className="bg-[rgb(239,246,255)] rounded-xl p-[28px] pl-[30px] items-start">
        <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
          <InfoOutline size={36} color={"#3B82F6"} />
        </MediaQuery>

        <Stack className="w-11/12">
          <Title className="text-[22px] font-semibold text-[#3B82F6] mt-1 inline">
            <MediaQuery
              smallerThan={"lg"}
              styles={{ display: "inline !important" }}
              className="hidden relative -top-[1px] mr-2 p-[1px]"
            >
              <InfoOutline size={36} color={"#3B82F6"} />
            </MediaQuery>
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
          headings: {
            fontWeight: 400,
            fontFamily: "Nunito Sans, sans-serif",
          },
          breakpoints: {
            sm: 800,
            md: 1000,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
          } as any,
          primaryShade: 5,
          colors: {
            "primary-text": [
              "#657387",
              "#5b697d",
              "#515f73",
              "#475569",
              "#3d4b5f",
              "#334155",
              "#29374b",
              "#1f2d41",
              "#152337",
              "#0b192d",
            ],
            "secondary-text": [
              "#c6d5ea",
              "#bccbe0",
              "#b2c1d6",
              "#a8b7cc",
              "#9eadc2",
              "#94a3b8",
              "#8a99ae",
              "#808fa4",
              "#76859a",
              "#6c7b90",
            ],
            primary: [
              "#918cff",
              "#8782ff",
              "#7d78ff",
              "#736eff",
              "#6964ff",
              "#5f5af7",
              "#5550ed",
              "#4b46e3",
              "#413cd9",
              "#3732cf",
            ],
            error: [
              "#ff5e88",
              "#ff547e",
              "#ff4a74",
              "#ff406a",
              "#ff3660",
              "#ff2c56",
              "#f5224c",
              "#eb1842",
              "#e10e38",
              "#d7042e",
            ],
            background: [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#f5f5f5",
              "#ebebeb",
              "#e1e1e1",
              "#d7d7d7",
            ],
            divider: [
              "#e7f4ff",
              "#ddeaf9",
              "#d3e0ef",
              "#c9d6e5",
              "#bfccdb",
              "#b5c2d1",
              "#abb8c7",
              "#a1aebd",
              "#97a4b3",
              "#8d9aa9",
            ],
            secondary: [
              "#ffffff",
              "#ffffff",
              "#fcfbff",
              "#f2f1ff",
              "#e8e7fb",
              "#deddf1",
              "#d4d3e7",
              "#cac9dd",
              "#c0bfd3",
              "#b6b5c9",
            ],
          },
          primaryColor: "primary",
          fontFamily: "Nunito Sans, sans-serif",
          components: {
            Radio: {
              defaultProps: { color: "primary" },
            },
            InputWrapper: {
              defaultProps: { color: "divider" },
            },
            Input: {
              defaultProps: { color: "divider" },
            },
            Button: {
              defaultProps: { size: "xs" },
              // Subscribe to theme and component params
              styles: (theme, params: ButtonStylesParams) => {
                const buttonFontSize: any = {
                  xs: "md",
                  sm: "md",
                };
        
                return {
                  root: {
                    fontSize: (theme.fontSizes as any)[
                      buttonFontSize[params.size] || params.size
                    ],
                    backgroundColor:
                      params.variant === "filled"
                        ? `${
                            theme.colors[params.color || theme.primaryColor][9]
                          } !important`
                        : undefined,
                  },
                };
              },
            },
          },
        }}
      >
        <Grid className="mt-2" gutter={"xl"}>
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
