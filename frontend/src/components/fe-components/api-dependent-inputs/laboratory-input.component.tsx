import { SelectItem, SelectProps } from "@mantine/core";
import React from "react";
import { useQuery } from "react-query";
import { SelectInput } from "src/components/FormInput";
import { LABORATORY_KEY } from "src/query-functions/const.query-function";
import { qfGetLaboratories } from "src/query-functions/laboratory.query-function";

interface ILaboratoryInputProps extends Omit<SelectProps, "data"> {
  shouldDisabled?: string;
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
  const { data, isLoading, status } = useQuery(
    LABORATORY_KEY,
    qfGetLaboratories
  );

  const selectItems = data?.data?.map((data: ILaboratoryDataItem) => {
    const selectItem: SelectItem = {
      value: data.labId + "",
      label: data.labNama,
      disabled: !!shouldDisabled ? shouldDisabled === data.labId + "" : false,
    };

    return selectItem;
  });
  return (
    <SelectInput {...props} data={selectItems ?? []} disabled={isLoading} />
  );
};
export default LaboratoryInput;
