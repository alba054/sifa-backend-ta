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
  const { getInputProps, errors, setValues } = form;

  return (
    <Stack spacing={"sm"}>
      <SelectInput
        required
        size={SIZE}
        {...getInputProps("seminarType")}
        error={errors["seminarType" as keyof IFESeminarFormValues]}
        data={[
          {
            value: "Ujian Sidang",
            label: "Ujian Sidang",
          },
          { value: "Ujian Proposal", label: "Ujian Proposal" },
        ]}
        label="Jenis Seminar"
        placeholder="Pilih Jenis Seminar"
      />
    </Stack>
  );
};
export default FESeminarForm;
