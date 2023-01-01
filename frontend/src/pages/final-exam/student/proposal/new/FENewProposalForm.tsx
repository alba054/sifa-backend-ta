import { Alert, Button, Divider, Stack, Text } from "@mantine/core";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { useMutation } from "react-query";
import { InformationOutline } from "src/assets/Icons/Fluent";
import DocumentInput from "src/components/DocumentInput";
import { POST_THESIS } from "src/query-functions/const.query-function";
import {
  IQFPostStudentThesis,
  qfPostStudentThesis,
} from "src/query-functions/student.query-function";
import { COLORS } from "src/themes/colors.theme";
import { ParseFileBase64 } from "src/utils/functions/common.function";
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
  const { mutate, isLoading } = useMutation(
    POST_THESIS,
    qfPostStudentThesis,
    {}
  );
  async function handleSubmit(values: IFENewProposalFormValues) {
    const firstOffer = values.firstOffer;
    const secondOffer = values.secondOffer;

    const khsBase64 = await ParseFileBase64(values.academicRecord);
    const krsBase64 = await ParseFileBase64(values.krs);

    const postNewProposal: IQFPostStudentThesis = {
      labID_1st: firstOffer.firstLaboratory,
      labID_2nd: firstOffer.secondLaboratory,
      title_1st: firstOffer.title,
      lecturerPropose_1st: firstOffer.lecturer,
      labID2_1st: secondOffer.firstLaboratory,
      labID2_2nd: secondOffer.secondLaboratory,
      title_2nd: secondOffer.title,
      lecturerPropose_2nd: secondOffer.lecturer,
      khs: khsBase64,
      krs: krsBase64,
    };
    console.log(postNewProposal);
    mutate(postNewProposal);
  }
  // console.log(values);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
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
