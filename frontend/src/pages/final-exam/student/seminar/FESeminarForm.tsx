import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { SelectInput } from "src/components/FormInput";
import { IFESeminarFormValues } from "./FESeminarInterfaces";

interface IFESeminarFormProps {
  form: Omit<UseFormReturnType<IFESeminarFormValues>, "onSubmit">;
}

const SIZE = "md";

const FESeminarForm: React.FC<IFESeminarFormProps> = ({ form }) => {
  const { getInputProps, errors, setValues, values } = form;

  return (
    <Stack spacing={"sm"}>
      <SelectInput
        required
        size={SIZE}
        {...getInputProps("seminarType")}
        error={errors["seminarType" as keyof IFESeminarFormValues]}
        data={[
          {
            value: "Seminar Proposal",
            label: "Seminar Proposal",
          },
          { value: "Seminar Hasil", label: "Seminar Hasil" },
          { value: "Ujian Skripsi", label: "Ujian Skripsi" },
        ]}
        label="Jenis Seminar"
        placeholder="Pilih Jenis Seminar"
      />
    </Stack>
  );
};
export default FESeminarForm;
