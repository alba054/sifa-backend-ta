import { Stack } from "@mantine/core";
import {
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import DocumentInput from "src/components/DocumentInput";
import {
  RadioGroup,
  SelectInput,
  TextArea,
  TextInput,
} from "src/components/FormInput";
import { IFEProposalFormValues } from "./FEProposalInterfaces";

interface IFEProposalFormProps {
  form: Omit<UseFormReturnType<IFEProposalFormValues>, "onSubmit">;
}

const SIZE = "md";

const FEProposalForm: React.FC<IFEProposalFormProps> = ({ form }) => {
  const { getInputProps, errors, setValues } = form;

  return (
    <Stack spacing={"sm"}>
      <TextInput
        required
        label="Judul yang diusulkan"
        placeholder="Input judul"
        size={SIZE}
        {...getInputProps("title")}
        error={errors["title" as keyof IFEProposalFormValues]}
      />
      <div className={`grid gap-x-4 grid-cols-2`}>
        <div className={`col-span-1`}>
          <SelectInput
            required
            size={SIZE}
            {...getInputProps("laboratory")}
            error={errors["laboratory" as keyof IFEProposalFormValues]}
            data={[
              { value: "Test 1", label: "Value 1" },
              { value: "Test 2", label: "Value 2" },
            ]}
            label="Laboratorium"
            placeholder="Pilih laboratorium"
          />
        </div>
        <div className={`col-span-1`}>
          <SelectInput
            {...getInputProps("mainLecturer")}
            error={errors["mainLecturer" as keyof IFEProposalFormValues]}
            data={[
              { value: "Test 1", label: "Value 1" },
              { value: "Test 2", label: "Value 2" },
            ]}
            required
            label="Pembimbing utama yang diusulkan"
            placeholder="Pilih pembimbing"
            size={SIZE}
          />
        </div>
      </div>
      <div className={`grid gap-x-4 grid-cols-2`}>
        <DocumentInput
          {...getInputProps("mainLecturer")}
          size="md"
          accept={[PDF_MIME_TYPE, MS_WORD_MIME_TYPE, MS_EXCEL_MIME_TYPE]}
          label="File draf proposal"
          withPreview
          error={errors["proposalFile" as keyof IFEProposalFormValues]}
          description="*Ekstensi file yang diperbolehkan adalah pdf atau docx"
        />
        <RadioGroup
          {...getInputProps("isHaveLecturerDecree")}
          error={errors["isHaveLecturerDecree" as keyof IFEProposalFormValues]}
          required
          label="Sudah memiliki SK pembimbing dan penguji?"
          data={[
            { label: "Sudah", value: true },
            { label: "Belum", value: false },
          ]}
          size={SIZE}
          onChange={(value) => {
            setValues((val) => ({
              ...val,
              isHaveLecturerDecree: JSON.parse(value),
            }));
          }}
        />
      </div>

      <TextArea
        {...getInputProps("note")}
        error={errors["note" as keyof IFEProposalFormValues]}
        label="Catatan (Opsional)"
        size={SIZE}
      />
    </Stack>
  );
};
export default FEProposalForm;
