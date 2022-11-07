import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { SelectInput } from "src/components/FormInput";
import { IFELabFreeFormValues } from "./FELabFreeInterfaces";

interface IFELabFreeFormProps {
  form: Omit<UseFormReturnType<IFELabFreeFormValues>, "onSubmit">;
}

const SIZE = "md";

const FELabFreeForm: React.FC<IFELabFreeFormProps> = ({ form }) => {
  const { getInputProps, errors, setValues } = form;

  return (
    <Stack spacing={"sm"}>
      <SelectInput
        required
        size={SIZE}
        {...getInputProps("laboratory")}
        error={errors["laboratory" as keyof IFELabFreeFormValues]}
        data={[
          {
            value: "Laboratorium Biofarmaka",
            label: "Laboratorium Biofarmaka",
          },
          { value: "Laboratorium Fisika", label: "Laboratorium Fisika" },
        ]}
        label="Laboratorium"
        placeholder="Pilih laboratorium"
      />
    </Stack>
  );
};
export default FELabFreeForm;
