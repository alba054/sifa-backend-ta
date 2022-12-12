import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React, { useEffect } from "react";
import { SelectInput } from "src/components/FormInput";
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
}

const SIZE = "md";

const FELabFreeForm: React.FC<IFELabFreeFormProps> = ({ form, data }) => {
  const { getInputProps, errors, setValues } = form;

  const { array: possibleLabValue, clear, push } = useArray([]);

  useUpdateEffect(() => {
    clear();
    for (let i = 0; i < data.length; i++) {
      if (data[i].show === false) {
        continue;
      }

      push({
        value: data[i].labLabel,
        label: data[i].labValue,
      });
    }
  }, []);

  return (
    <Stack spacing={"sm"}>
      <SelectInput
        required
        size={SIZE}
        {...getInputProps("laboratory")}
        error={errors["laboratory" as keyof IFELabFreeFormValues]}
        data={possibleLabValue}
        label="Laboratorium"
        placeholder="Pilih laboratorium"
      />
    </Stack>
  );
};
export default FELabFreeForm;
