import { Group, Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import FESmallInformationNotification from "src/components/fe-components/FESmallInformationNotification";
import FEInputModal from "src/components/FEInputModal";
import {
  DatePickerInput,
  FETimeInput,
  FETimeRangeInput,
  SelectInput,
  TextArea,
  TextInput,
} from "src/components/FormInput";
import {
  feSeminarScheduleSchema,
  IFESeminarScheduleValues,
} from "./FESeminarCoordinatorSeminarSchedulingInterfaces";

export interface IFESeminarCoordinatorSeminarSchedulingModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
}

const FESeminarCoordinatorSeminarSchedulingModal: React.FC<
  IFESeminarCoordinatorSeminarSchedulingModal
> = ({ opened, setOpened, onSubmit }) => {
  const { onSubmit: onSubmitForm, ...form } = useForm<IFESeminarScheduleValues>(
    {
      validate: yupResolver(feSeminarScheduleSchema),
    }
  );

  const { getInputProps, errors, setValues, values } = form;

  return (
    <FEInputModal
      opened={opened}
      setOpened={
        ((e: boolean) => {
          setOpened(e);
          setValues({
            notes: undefined,
            offlinePlace: undefined,
            seminarDate: undefined,
            seminarTimeEnd: undefined,
            seminarTimeStart: undefined,
            seminarType: undefined,
            student:undefined
          });
        }) as any
      }
      title={"Buat Jadwal Seminar"}
      yesButtonLabel="Simpan"
      maxWidth={900}
      onSubmit={
        onSubmitForm(() => {
          onSubmit(values);
          setValues({
            notes: undefined,
            offlinePlace: undefined,
            seminarDate: undefined,
            seminarTimeEnd: undefined,
            seminarTimeStart: undefined,
            seminarType: undefined,
            student:undefined
          });
        }) as any
      }
    >
      <Stack>
        <Group grow>
          <SelectInput
            label="Mahasiswa"
            size="md"
            placeholder="Mahasiswa yang melakukan seminar"
            data={[
              {
                key: 0,
                value: "H071191053 - Richardo Enrico Sulieanto",
                label: "H071191053 - Richardo Enrico Sulieanto",
              },
            ]}
            {...getInputProps("student")}
            error={errors["student" as keyof IFESeminarScheduleValues]}
          />
          <SelectInput
            label="Jenis Seminar"
            placeholder="Pilih jenis seminar"
            size="md"
            data={[
              {
                key: 0,
                value: "Seminar Proposal",
                label: "Seminar Proposal",
              },
              {
                key: 1,
                value: "Seminar Hasil",
                label: "Seminar Hasil",
              },
              {
                key: 2,
                value: "Ujian Skripsi",
                label: "Ujian Skripsi",
              },
            ]}
            {...getInputProps("seminarType")}
            error={errors["seminarType" as keyof IFESeminarScheduleValues]}
          />
        </Group>
        <Group grow>
          <DatePickerInput
            size="md"
            label="Tanggal Pelaksanaan"
            placeholder="Pilih tanggal pelaksanaan"
            className="self-end"
            {...getInputProps("seminarDate")}
            error={errors["seminarDate" as keyof IFESeminarScheduleValues]}
          />
        </Group>
        <Group grow>
          <FETimeInput
            clearable
            label="Waktu Pelaksanaan (awal)"
            className="self-end"
            {...getInputProps("seminarTimeStart")}
            error={errors["seminarTimeStart" as keyof IFESeminarScheduleValues]}
          />
          {/* <Text className="w-2 self-center mt-6 font-bold text-lg text-secondary-text-500">
              -
            </Text> */}
          <FETimeInput
            clearable
            label="Waktu Pelaksanaan (akhir)"
            className="self-end"
            {...getInputProps("seminarTimeEnd")}
            error={errors["seminarTimeEnd" as keyof IFESeminarScheduleValues]}
          />
        </Group>
        <Group grow>
          <TextInput
            label="Tempat (luring)"
            size="md"
            placeholder="Masukkan Tempat (luring) Pelaksanaan Seminar"
            {...getInputProps("offlinePlace")}
            error={errors["offlinePlace" as keyof IFESeminarScheduleValues]}
          />
        </Group>
        {/* <TextInput
          label="Tempat"
          size="md"
          placeholder="Masukkan Tempat (luring) Pelaksanaan Seminar"
        /> */}
        <TextArea
          label="Catatan/Link (Opsional)"
          size="md"
          placeholder="Catatan tambahan..."
          {...getInputProps("notes")}
          error={errors["notes" as keyof IFESeminarScheduleValues]}
        />
        <FESmallInformationNotification
          info={
            "Setelah dibuat, field mahasiswa dan jenis seminar sudah tidak dapat diedit!"
          }
        />
      </Stack>
    </FEInputModal>
  );
};
export default FESeminarCoordinatorSeminarSchedulingModal;
