import { Alert, Button, Divider, Stack, Text } from "@mantine/core";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { InformationOutline } from "src/assets/Icons/Fluent";
import DocumentInput from "src/components/DocumentInput";
import { COLORS } from "src/themes/colors.theme";
import FEProposalApplicationForm from "./FENewProposalApplicationForm";
import {
  feNewProposalFormSchema,
  IFENewProposalFormValues,
} from "./FENewProposalInterfaces";

interface IFENewProposalFormProps {}

const FENewProposalForm: React.FC<IFENewProposalFormProps> = ({}) => {
  const form = useForm<IFENewProposalFormValues>({
    validate: yupResolver(feNewProposalFormSchema),
  });
  const { getInputProps, values, errors, onSubmit } = form;
  function handleSubmit(values: IFENewProposalFormValues) {
    console.log(values);
  }

  // console.log(values);

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack >
        <FEProposalApplicationForm
          {...getInputProps("firstOffer")}
          title="Usulan 1"
          name="firstOffer"
          errors={errors}
        />
        <Divider my={"lg"} />
        <FEProposalApplicationForm
          {...getInputProps("secondOffer")}
          title="Usulan 2"
          name="secondOffer"
          errors={errors}
        />

        <DocumentInput
          {...getInputProps("academicRecord")}
          required
          label="File Transkrip Nilai"
          accept={PDF_MIME_TYPE}
          placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
          description="Ekstensi file PDF, ukuran file maksimal 5 MB."
          error={
            errors[`${"academicRecord" as keyof IFENewProposalFormValues}.name`]
          }
        />
        <DocumentInput
          {...getInputProps("krs")}
          required
          accept={PDF_MIME_TYPE}
          label="File KRS yang memprogramkan mata kuliah Seminar Skripsi 1"
          placeholder="Seret dan tempatkan file ke sini, atau klik untuk memilih file."
          description="Ekstensi file PDF, ukuran file maksimal 5 MB."
          error={errors[`${"krs" as keyof IFENewProposalFormValues}.name`]}
        />

        <Alert
          icon={<InformationOutline size={32} color={COLORS.PRIMARY} />}
          classNames={{ root: "bg-info", wrapper: "flex items-center" }}
        >
          <Text size="lg" color={"primary"}>
            Field dengan tanda (*) wajib diisi
          </Text>
        </Alert>

        <Button mt={"lg"} size="md" type="submit">
          Buat Usulan
        </Button>
      </Stack>
    </form>
  );
};
export default FENewProposalForm;
