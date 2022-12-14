import {
  Button,
  Group,
  Modal, Stack, Text, useMantineTheme
} from "@mantine/core";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import DocumentInput from "src/components/DocumentInput";
import FEFileUpload from "src/components/fe-components/FEFileUpload";
import {
  feTrialPermitFormSchema,
  IFETrialPermitFormValues
} from "./FETrialPermitFormValues";

interface IFETrialPermitInputModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  handleSubmit: () => void;
  noButtonLabel?: string;
  yesButtonLabel?: string;
}

const FETrialPermitInputModal = ({
  opened,
  setOpened,
  title,
  handleSubmit,
  noButtonLabel = "Batal",
  yesButtonLabel = "Buat Permohonan",
}: // form,
IFETrialPermitInputModalProps) => {
  const theme = useMantineTheme();

  const form = useForm<IFETrialPermitFormValues>({
    validate: yupResolver(feTrialPermitFormSchema),
  });

  const { getInputProps, values, errors, onSubmit } = form;

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={title}
      padding={30}
      styles={{
        modal: {
          maxWidth: "800px",
          width: "100%",
          borderRadius: "12px",
        },
        title: {
          fontSize: 24,
          color: theme.colors["primary-text"][5],
          fontWeight: 700,
        },
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="py-2">
          <Stack>
            <Text>
              Untuk membuat Permohonan Izin Ujian Sidang, Anda perlu mengupload
              beberapa dokumen berikut.
            </Text>
            <FEFileUpload
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
                        "pelaporanPDDikti" as keyof IFETrialPermitFormValues
                      }.name`
                    ]
                  }
                />
              }
            />

            <FEFileUpload
              title="Bukti Klirins SPP/UKT"
              documentInput={
                <DocumentInput
                  {...getInputProps("buktiKlirinsSppUkt")}
                  required
                  accept={PDF_MIME_TYPE}
                  label=""
                  placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
                  description="Ekstensi file PDF, ukuran file maksimal 5 MB."
                  error={
                    errors[
                      `${
                        "buktiKlirinsSppUkt" as keyof IFETrialPermitFormValues
                      }.name`
                    ]
                  }
                />
              }
            />
          </Stack>
        </div>
        <Group position="right" mt={"md"} className="pt-4">
          <Button
            variant="light"
            color={"primary"}
            onClick={() => setOpened(false)}
            className="font-bold hover:bg-white"
          >
            {noButtonLabel}
          </Button>
          <Button
            className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
            type="submit"
          >
            {yesButtonLabel}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default FETrialPermitInputModal;
