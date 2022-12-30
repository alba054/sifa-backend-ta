import { SelectItem, SelectProps } from "@mantine/core";
import React from "react";
import { SelectInput } from "src/components/FormInput";
import { useLecturersData } from "src/contexts/lecturer-data.context";

interface ILecturerInputProps extends SelectProps {}

interface ILecturerDataItem {
  dsnAlamat: string;
  dsnDprtId: number;
  dsnGelarBelakang: string;
  dsnGelarDepan: string;
  dsnId: number;
  dsnJK: string;
  dsnNama: string;
  dsnNip: string;
  dsnTempatLahir: string;
  dsnTglLahir: string;
  statusKepegawaian: string;
}

const LecturerInput: React.FC<ILecturerInputProps> = ({ ...props }) => {
  const { data, isLoading } = useLecturersData();

  const selectItems = data?.data?.map((data: ILecturerDataItem) => {
    const selectItem: SelectItem = {
      value: data.dsnId + "",
      label: data.dsnNama,
    };

    return selectItem;
  });
  return (
    <SelectInput {...props} data={selectItems ?? []} disabled={isLoading} />
  );
};
export default LecturerInput;
