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
import LFPEmptyDataComponent from "src/components/FEComponents/LFPEmptyData.component";
import LFPHeaderComponent from "src/components/FEComponents/LFPHeader.component";
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
      {/* Input modal */}
      <FEInputModal
        opened={isOpen}
        title="Form Pengusulan Tugas Akhir"
        setOpened={setIsOpen}
        onSubmit={onSubmit(handleSubmit) as any}
        component={<FEProposalForm form={form} />}
      />

      <Stack spacing={"xl"}>
        {/* Bebas lab, tugas akhir Header */}
        <LFPHeaderComponent
          title="Usulan Tugas Akhir"
          onClick={handleAddProposalClick}
          addButtonLabel={"Buat Permohonan Baru"}
        />

        {/* Empty page component */}
        <Stack
          py={"xl"}
          className={`border-dashed border rounded-md border-secondary-text-800`}
        >
          <LFPEmptyDataComponent
            title="Belum Ada Permohonan"
            caption={
              "Untuk membuat permohonan bebas lab, tekan tombol “Buat Permohonan Baru” di pojok kanan atas."
            }
          />
        </Stack>
      </Stack>
    </FEMainLayout>
  );
};
export default FEProposalPage;
