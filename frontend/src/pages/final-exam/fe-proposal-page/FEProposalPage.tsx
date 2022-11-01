import {
  Button,
  Group,
  Input,
  Radio,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import { openModal } from "@mantine/modals";
import React, { useState } from "react";
import ArrowUploadIcon from "src/assets/Icons/ArrowUploadIcon";
import { AddFilled, ArrowUpOutline } from "src/assets/Icons/Fluent";
import NoFilesAnimationIcon from "src/assets/Icons/NoFilesAnimationIcon";
import FEInputModal from "src/components/FEInputModal";
import { TextInput } from "src/components/FormInput";
import FEMainLayout from "src/layouts/FinalExam/FEMainlayout";
import FEProposalForm from "./FEProposalForm";
import {
  feProposalFormSchema,
  IFEProposalFormValues,
} from "./FEProposalInterfaces";

interface IFEProposalPageProps {}

const FEProposalPage: React.FC<IFEProposalPageProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleAddProposalClick() {
    setIsOpen(true);
  }

  const { onSubmit, ...form } = useForm<IFEProposalFormValues>({
    validate: yupResolver(feProposalFormSchema),
  });

  function handleSubmit(values: IFEProposalFormValues) {
    console.log(values);
  }

  return (
    <FEMainLayout>
      <FEInputModal
        opened={isOpen}
        title="Form Pengusulan Tugas Akhir"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
      >
        <FEProposalForm form={form} />
      </FEInputModal>

      <Stack spacing={"xl"}>
        <Group position="apart">
          <Title order={2}>Usulan Tugas Akhir</Title>
          <Button
            variant="outline"
            color="primary-text"
            onClick={handleAddProposalClick}
          >
            <AddFilled className={`mr-1 mb-[1px]`} size={14} />
            Buat Permohonan Baru
          </Button>
        </Group>

        <Stack
          py={"xl"}
          className={`border-dashed border rounded-md border-secondary-text-800`}
        >
          <Stack align={"center"}>
            <NoFilesAnimationIcon />
            <Stack spacing={0}>
              <Text align="center">Belum Ada Permohonan</Text>
              <Text align="center" color={"secondary-text"}>
                Untuk membuat permohonan bebas lab, tekan tombol “Buat
                Permohonan Baru” di pojok kanan atas.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </FEMainLayout>
  );
};
export default FEProposalPage;
