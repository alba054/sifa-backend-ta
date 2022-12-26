import { SelectItem, SelectProps } from "@mantine/core";
import React from "react";
import { useQuery } from "react-query";
import { SelectInput } from "src/components/FormInput";
import { LABORATORY_KEY } from "src/query-functions/const.query-function";
import { qfGetLaboratories } from "src/query-functions/laboratory.query-function";
import { qfGetLecturers } from "src/query-functions/lecurer.query-function";

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
  const { data, isLoading } = useQuery(LABORATORY_KEY, qfGetLecturers);

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
