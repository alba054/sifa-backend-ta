import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import { FEArrowCircleOutline } from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFEStudentHomepageProposalApplications {
  proposalComp?: IFEStudentHomepageProposalApplicationComp;
  seminarComp?: IFEStudentHomepageProposalApplicationComp;
  trialPermitComp?: IFEStudentHomepageProposalApplicationComp;
}

interface IFEStudentHomepageProposalApplicationComp {
  currentProgress: number;
  status: "process" | "accepted" | "rejected";
  date: string;
}

const FEStudentHomepageProposalApplications: React.FC<
  IFEStudentHomepageProposalApplications
> = ({ proposalComp, seminarComp, trialPermitComp }) => {
  return (
    <Stack>
      <>
        {proposalComp == null &&
        seminarComp == null &&
        trialPermitComp == null ? null : (
          <>
            <Text className="text-[22px] text-primary-text-500 font-semibold">
              Permohonan & Usulan
            </Text>
            <Stack className="gap-6">
              <>
                {proposalComp && (
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
                      <FELinkMore
                        caption="Lihat Lebih Lengkap"
                        to={FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL}
                      />
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
                      currentProgress={proposalComp!.currentProgress}
                      proposalDate={proposalComp!.date}
                    />
                  </Stack>
                )}
              </>

              <>
                {seminarComp && (
                  <Stack>
                    <Group className="justify-between">
                      <Group>
                        <FEArrowCircleOutline
                          className="border rounded-full border-secondary-500"
                          size={28}
                        />
                        <Text className="font-semibold tracking-1 text-lg">
                          Seminar
                        </Text>
                      </Group>
                      <FELinkMore
                        caption="Lihat Lebih Lengkap"
                        to={FEROUTES.STUDENT_SEMINAR}
                      />
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
                      currentProgress={seminarComp!.currentProgress}
                      proposalDate={seminarComp!.date}
                    />
                  </Stack>
                )}
              </>

              <>
                {trialPermitComp && (
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
                      <FELinkMore
                        caption="Lihat Lebih Lengkap"
                        to={FEROUTES.STUDENT_TRIAL_PERMIT}
                      />
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
                      currentProgress={trialPermitComp!.currentProgress}
                      proposalDate={trialPermitComp!.date}
                    />
                  </Stack>
                )}
              </>
            </Stack>
          </>
        )}
      </>
    </Stack>
  );
};
export default FEStudentHomepageProposalApplications;
