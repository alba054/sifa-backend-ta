import { SelectItem, SelectProps } from "@mantine/core";
import React from "react";
import { SelectInput } from "src/components/FormInput";
import { useLaboratoryData } from "src/contexts/laboratory-data.context";

interface ILaboratoryInputProps extends Omit<SelectProps, "data"> {
  shouldDisabled?: string[];
}

interface ILaboratoryDataItem {
  labId: number;
  labKepalaNama: string;
  labKepalaNip: string;
  labKodeNomor: number;
  labNama: string;
  labPrdId: number;
  labTTd: string;
}

const LaboratoryInput: React.FC<ILaboratoryInputProps> = ({
  shouldDisabled,
  ...props
}) => {
  const { data, isLoading } = useLaboratoryData();
  const selectItems = data?.data?.map((data: ILaboratoryDataItem) => {
    const selectItem: SelectItem = {
      value: data.labId + "",
      label: data.labNama,
      disabled: !!shouldDisabled
        ? shouldDisabled.includes(data.labId + "")
        : false,
    };

    return selectItem;
  });
  return (
    <SelectInput {...props} data={selectItems ?? []} disabled={isLoading} />
  );
};
export default LaboratoryInput;
