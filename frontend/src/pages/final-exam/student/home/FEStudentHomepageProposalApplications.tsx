import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import { FEArrowCircleOutline } from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FEProgressBar from "src/components/fe-components/FEProgressBar";

export interface IFEStudentHomepageProposalApplications {}

const FEStudentHomepageProposalApplications: React.FC<
  IFEStudentHomepageProposalApplications
> = ({}) => {
  return (
    <Stack>
      <Text className="text-[22px] text-primary-text-500 font-semibold">
        Permohonan & Usulan
      </Text>
      <Stack className="gap-6">
        <Stack>
          <Group className="justify-between">
            <Group>
              <FEArrowCircleOutline
                className="border rounded-full border-secondary-500"
                size={28}
              />
              <Text className="font-semibold tracking-1 text-lg">
                Tugas Akhir
              </Text>
            </Group>
            <FELinkMore caption="Lihat Lebih Lengkap" />
          </Group>

          <FEProgressBar
            progressStages={[
              "Pengusulan Judul",
              "Judul Diterima",
              "Verifikasi Dokumen",
              "Penyusunan Tim Seminar",
              "Penandatangan SK",
              "SK Diterima",
            ]}
            currentProgress={1}
            proposalDate={"20 November 2022"}
          />
        </Stack>

        <Stack>
          <Group className="justify-between">
            <Group>
              <FEArrowCircleOutline
                className="border rounded-full border-secondary-500"
                size={28}
              />
              <Text className="font-semibold tracking-1 text-lg">Seminar</Text>
            </Group>
            <FELinkMore caption="Lihat Lebih Lengkap" />
          </Group>

          <FEProgressBar
            progressStages={[
              "Permohonan Seminar",
              "Validasi Berkas",
              "Pembuatan Surat",
              "Penyerahan Surat/Berkas",
              "Penandatangan Surat",
              "Surat diterima",
            ]}
            currentProgress={1}
            proposalDate={"20 November 2022"}
          />
        </Stack>

        <Stack>
          <Group className="justify-between">
            <Group>
              <FEArrowCircleOutline
                className="border rounded-full border-secondary-500"
                size={28}
              />
              <Text className="font-semibold tracking-1 text-lg">
                Izin Ujian Sidang
              </Text>
            </Group>
            <FELinkMore caption="Lihat Lebih Lengkap" />
          </Group>

          <FEProgressBar
            progressStages={[
              "Permohonan Dibuat",
              "Validasi Berkas",
              "Pembuatan Surat",
              "Penyerahan Surat/Berkas",
              "Penandatangan Surat",
              "Surat diterima",
            ]}
            currentProgress={1}
            proposalDate={"20 November 2022"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default FEStudentHomepageProposalApplications;
