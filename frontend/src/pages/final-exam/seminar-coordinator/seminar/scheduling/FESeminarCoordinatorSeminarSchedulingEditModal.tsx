import { Group, Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
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

export interface IFESeminarCoordinatorSeminarSchedulingEditModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
  name?: string;
  studentDefault: any;
  seminarTypeDefault: string;
  seminarDateDefault: Date;
  seminarTimeStartDefault: Date;
  seminarTimeEndDefault: Date;
  offlinePlaceDefault: string;
  notesDefault?: string;
}

const FESeminarCoordinatorSeminarSchedulingEditModal: React.FC<
  IFESeminarCoordinatorSeminarSchedulingEditModal
> = ({
  opened,
  setOpened,
  onSubmit,
  notesDefault,
  offlinePlaceDefault,
  seminarDateDefault,
  seminarTimeEndDefault,
  seminarTimeStartDefault,
  seminarTypeDefault,
  studentDefault,
  name = "",
}) => {
  const { onSubmit: onSubmitForm, ...form } = useForm<IFESeminarScheduleValues>(
    {
      validate: yupResolver(feSeminarScheduleSchema),
    }
  );

  const { getInputProps, errors, setValues, values } = form;

  useEffect(() => {
    setValues({
      student: studentDefault,
      notes: notesDefault,
      offlinePlace: offlinePlaceDefault,
      seminarDate: seminarDateDefault,
      seminarTimeEnd: seminarTimeEndDefault,
      seminarTimeStart: seminarTimeStartDefault,
      seminarType: seminarTypeDefault,
    });
  }, []);

  return (
    <FEInputModal
      opened={opened}
      setOpened={
        ((e: boolean) => {
          setOpened(e);
        }) as any
      }
      title={`Edit Jadwal Seminar - ${name}`}
      yesButtonLabel="Ubah"
      maxWidth={900}
      onSubmit={
        onSubmitForm(() => {
          onSubmit(values);
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
              {
                key: 1,
                value: "H071191044 - Muh. Yusuf Syam",
                label: "H071191044 - Muh. Yusuf Syam",
              },
              {
                key: 2,
                value: "H071191055 - Richardo Enrico Sulieanto",
                label: "H071191055 - Richardo Enrico Sulieanto",
              },
              {
                key: 3,
                value: "H071191056 - Richardo Enrico Sulieanto",
                label: "H071191056 - Richardo Enrico Sulieanto",
              },
            ]}
            {...getInputProps("student")}
            error={errors["student" as keyof IFESeminarScheduleValues]}
            defaultValue={studentDefault}
            disabled
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
            defaultValue={seminarTypeDefault}
            disabled
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
            defaultValue={seminarDateDefault}
          />
        </Group>
        <Group grow>
          <FETimeInput
            clearable
            label="Waktu Pelaksanaan (awal)"
            className="self-end"
            {...getInputProps("seminarTimeStart")}
            error={errors["seminarTimeStart" as keyof IFESeminarScheduleValues]}
            defaultValue={seminarTimeStartDefault}
            // defaultValue={}
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
            defaultValue={seminarTimeEndDefault}
          />
        </Group>
        <Group grow>
          <TextInput
            label="Tempat (luring)"
            size="md"
            placeholder="Masukkan Tempat (luring) Pelaksanaan Seminar"
            {...getInputProps("offlinePlace")}
            error={errors["offlinePlace" as keyof IFESeminarScheduleValues]}
            defaultValue={offlinePlaceDefault}
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
          defaultValue={notesDefault}
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
export default FESeminarCoordinatorSeminarSchedulingEditModal;
