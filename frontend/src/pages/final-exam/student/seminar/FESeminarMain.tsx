import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { FECalendarOutline, FEPenCircleOutline } from "src/assets/Icons/Fluent";
import DocumentInput from "src/components/DocumentInput";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import {
  feSeminarValidationFormSchema,
  IFESeminarValidationFormValues,
} from "./FESeminarValidationInterfaces";
import FESeminarFileUpload from "./FESeminarFileUpload";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";

export interface IFESeminarMain {}

const FESeminarMain: React.FC<IFESeminarMain> = ({}) => {
  const theme = useMantineTheme();

  const form = useForm<IFESeminarValidationFormValues>({
    validate: yupResolver(feSeminarValidationFormSchema),
  });

  function handleSubmit(values: IFESeminarValidationFormValues) {
    console.log(values);
  }

  const { getInputProps, values, errors, onSubmit } = form;

  return (
    <Stack className="gap-8">
      <FEInformationNotification
        description={
          <Text>
            Setelah melengkapi berkas persyaratan seminar, lakukan penguncian
            berkas dengan menekan tombol <Text className="font-extrabold inline">Kunci Berkas</Text>. Permohonan tidak akan
            diproses apabila berkas belum lengkap dan belum melakukan penguncian
            berkas.
          </Text>
        }
        type="warning"
      />
      <Stack className="py-7 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
        <Group className="justify-between mb-3">
          <Group spacing={"xs"}>
            <FEPenCircleOutline
              size={18}
              color={theme.colors["primary-text"][5]}
              className="inline"
            />
            <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
              Progress saat ini:{" "}
              <Text className="inline font-normal">Judul Diterima</Text>
            </Text>
          </Group>
          <Group spacing={"xs"}>
            <FECalendarOutline
              size={18}
              color={theme.colors["primary-text"][5]}
              className="inline"
            />
            <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
              {" "}
              Tanggal pengusulan:{" "}
              <Text className="inline font-normal">14 November 2022</Text>
            </Text>
          </Group>
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
          currentProgress={2}
        />
      </Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack className="pb-8 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md ">
          <Text className="py-5 mx-[-32px] pl-8 mb-3 text-md text-primary-text-500 font-bold tracking-[0.0015em] border-b border-secondary-500">
            Ujian Sidang
          </Text>
          <Text className="text-[20px] text-primary-text-500 font-normal">
            Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan
            Farmasi Potensial
          </Text>
          <Stack spacing={"xs"}>
            <Text className="text-primary-text-500 text-base font-bold tracking-[0.0025em]">
              Berkas Persyaratan Seminar:
            </Text>
            <Stack className="gap-8">
              <FESeminarFileUpload
                title="Pelaporan PD-Dikti"
                documentInput={
                  <DocumentInput
                    {...getInputProps("pelaporanPDDikti")}
                    required
                    accept={PDF_MIME_TYPE}
                    label=""
                    placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                    description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                    error={
                      errors[
                        `${
                          "pelaporanPDDikti" as keyof IFESeminarValidationFormValues
                        }.name`
                      ]
                    }
                  />
                }
              />
              <FESeminarFileUpload
                title="Bukti SPP / UKT"
                documentInput={
                  <DocumentInput
                    {...getInputProps("buktiSPPUKT")}
                    required
                    accept={PDF_MIME_TYPE}
                    label=""
                    placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                    description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                    error={
                      errors[
                        `${
                          "buktiSPPUKT" as keyof IFESeminarValidationFormValues
                        }.name`
                      ]
                    }
                    maxSize={500}
                  />
                }
              />
              <FESeminarFileUpload
                title="Ijazah Terakhir"
                documentInput={
                  <DocumentInput
                    {...getInputProps("ijazahTerakhir")}
                    required
                    accept={PDF_MIME_TYPE}
                    label=""
                    placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                    description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                    error={
                      errors[
                        `${
                          "ijazahTerakhir" as keyof IFESeminarValidationFormValues
                        }.name`
                      ]
                    }
                  />
                }
              />
              <FESeminarFileUpload
                title="Transkrip Nilai"
                documentInput={
                  <DocumentInput
                    {...getInputProps("transkripNilai")}
                    required
                    accept={PDF_MIME_TYPE}
                    label=""
                    placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                    description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                    error={
                      errors[
                        `${
                          "transkripNilai" as keyof IFESeminarValidationFormValues
                        }.name`
                      ]
                    }
                  />
                }
              />
              <FESeminarFileUpload
                title="Pas Foto Hitam Putih"
                documentInput={
                  <DocumentInput
                    {...getInputProps("pasFotoHitamPutih")}
                    required
                    accept={PDF_MIME_TYPE}
                    label=""
                    placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                    description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                    error={
                      errors[
                        `${
                          "pasFotoHitamPutih" as keyof IFESeminarValidationFormValues
                        }.name`
                      ]
                    }
                  />
                }
              />
              <FESeminarFileUpload
                title="Pelaporan Nilai Mata Kuliah pada Sistem APPS"
                documentInput={
                  <DocumentInput
                    {...getInputProps("pelaporanNilaiMK")}
                    required
                    accept={PDF_MIME_TYPE}
                    label=""
                    placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                    description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                    error={
                      errors[
                        `${
                          "pelaporanNilaiMK" as keyof IFESeminarValidationFormValues
                        }.name`
                      ]
                    }
                  />
                }
              />
              <FESeminarFileUpload
                title="Daftar Nilai Fisik Mata Kuliah pada Sistem APPS"
                documentInput={
                  <DocumentInput
                    {...getInputProps("daftarNilaiFisikMK")}
                    required
                    accept={PDF_MIME_TYPE}
                    label=""
                    placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                    description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                    error={
                      errors[
                        `${
                          "daftarNilaiFisikMK" as keyof IFESeminarValidationFormValues
                        }.name`
                      ]
                    }
                  />
                }
              />
            </Stack>
          </Stack>
          <Button mt={"lg"} size="md" type="submit" color={"primary"}>
            Kumpul
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
export default FESeminarMain;
