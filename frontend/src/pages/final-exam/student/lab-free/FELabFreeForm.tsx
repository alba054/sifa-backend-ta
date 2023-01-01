import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import LaboratoryInput from "src/components/fe-components/api-dependent-inputs/laboratory-input.component";
import useArray from "src/hooks/fe-hooks/useArray";
import useUpdateEffect from "src/hooks/fe-hooks/useUpdateEffect";
import { IFELabFreeFormValues } from "./FELabFreeInterfaces";

export interface laboratoyObject {
  id: number;
  labValue: string;
  labLabel: string;
  show: boolean;
}

interface IFELabFreeFormProps {
  form: Omit<UseFormReturnType<IFELabFreeFormValues>, "onSubmit">;
  data: any;
  selectedLabIds: string[];
}

const SIZE = "md";

const FELabFreeForm: React.FC<IFELabFreeFormProps> = ({
  form,
  selectedLabIds,
}) => {
  const { getInputProps, errors } = form;

  return (
    <Stack spacing={"sm"}>
      <LaboratoryInput
        required
        size={SIZE}
        shouldDisabled={selectedLabIds}
        {...getInputProps("laboratory")}
        error={errors["laboratory" as keyof IFELabFreeFormValues]}
        label="Laboratorium"
        placeholder="Pilih laboratorium"
      />
    </Stack>
  );
};
export default FELabFreeForm;
