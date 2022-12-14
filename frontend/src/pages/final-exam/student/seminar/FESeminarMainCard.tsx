import { Button, Stack, Text } from "@mantine/core";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import React, { useRef, useState } from "react";
import { LockOutline } from "src/assets/Icons/Fluent";
import DocumentInput from "src/components/DocumentInput";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FESeminarCardComp from "./FESeminarCardComp";
import FESeminarFileUpload from "./FESeminarFileUpload";
import {
  feSeminarValidationFormSchema,
  IFESeminarValidationFormValues,
} from "./FESeminarValidationInterfaces";

export interface IFESeminarMainCard {
  seminarType: string;
  title: string;
}

const FESeminarMainCard: React.FC<IFESeminarMainCard> = ({
  seminarType,
  title,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const form = useForm<IFESeminarValidationFormValues>({
    validate: yupResolver(feSeminarValidationFormSchema),
  });

  const { getInputProps, values, errors, onSubmit } = form;

  function handleSubmit(values: IFESeminarValidationFormValues) {
    setIsAlertOpen(true);
  }

  function handleSubmitAlert() {
    setIsLocked(!isLocked);
    setIsAlertOpen(false);
  }

  return (
    <FESeminarCardComp title={seminarType}>
      <FEAlertModal
        opened={isAlertOpen}
        setOpened={setIsAlertOpen}
        title={"Kunci Seluruh Berkas?"}
        description={
          "Pastikan SEMUA berkas yang diupload sudah benar. Anda dapat membuka kunci setelah melakukan aksi ini."
        }
        yesButtonLabel="Kunci"
        onSubmit={handleSubmitAlert}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text className="text-[18px] font-semibold text-primary-500 tracking-[0.0015em] mb-4">
          {title}
        </Text>
        <Stack spacing={"xs"}>
          <Text className="text-primary-text-500 text-base tracking-[0.0025em]">
            Berkas Persyaratan Seminar:
          </Text>
          <Stack className="gap-6">
            <FESeminarFileUpload
              title="Draf Proposal"
              documentInput={
                <DocumentInput
                  {...getInputProps("drafProposal")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  disabled={isLocked}
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${
                        "drafProposal" as keyof IFESeminarValidationFormValues
                      }.name`
                    ]
                  }
                />
              }
            />
            <FESeminarFileUpload
              title="Slide Presentasi"
              documentInput={
                <DocumentInput
                  {...getInputProps("slidePresentasi")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  disabled={isLocked}
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${
                        "slidePresentasi" as keyof IFESeminarValidationFormValues
                      }.name`
                    ]
                  }
                  maxSize={500}
                />
              }
            />
            <FESeminarFileUpload
              title="SK Pembimbing"
              documentInput={
                <DocumentInput
                  {...getInputProps("skPembimbing")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  disabled={isLocked}
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${
                        "skPembimbing" as keyof IFESeminarValidationFormValues
                      }.name`
                    ]
                  }
                />
              }
            />
            <FESeminarFileUpload
              title="SK Penguji"
              documentInput={
                <DocumentInput
                  {...getInputProps("skPenguji")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  disabled={isLocked}
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${
                        "skPenguji" as keyof IFESeminarValidationFormValues
                      }.name`
                    ]
                  }
                />
              }
            />
            <FESeminarFileUpload
              title="Surat Keterangan Aktif Kuliah"
              documentInput={
                <DocumentInput
                  {...getInputProps("skAktifKuliah")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  disabled={isLocked}
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${
                        "skAktifKuliah" as keyof IFESeminarValidationFormValues
                      }.name`
                    ]
                  }
                />
              }
            />
            <FESeminarFileUpload
              title="KRS yang memprogramkan mata kuliah Seminar Proposal"
              documentInput={
                <DocumentInput
                  {...getInputProps("krs")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  disabled={isLocked}
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${"krs" as keyof IFESeminarValidationFormValues}.name`
                    ]
                  }
                />
              }
            />
            <FESeminarFileUpload
              title="Bukti telah menghadiri Seminar Proposal minimal 5 kali"
              documentInput={
                <DocumentInput
                  {...getInputProps("buktiTelahMenghadiriSeminarProposal")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  disabled={isLocked}
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${
                        "buktiTelahMenghadiriSeminarProposal" as keyof IFESeminarValidationFormValues
                      }.name`
                    ]
                  }
                />
              }
            />
          </Stack>
        </Stack>
        <Button
          mt={"lg"}
          size="md"
          type="submit"
          color={"primary"}
          className="w-full"
          leftIcon={
            isLocked === true ? (
              <LockOutline color="white" size={18} className="mr-[-4px]" />
            ) : (
              <LockOutline color="white" size={18} className="mr-[-4px]" />
            )
          }
        >
          {isLocked === true ? "Buka Kunci Berkas" : "Kunci Berkas"}
        </Button>
      </form>
    </FESeminarCardComp>
  );
};
export default FESeminarMainCard;
