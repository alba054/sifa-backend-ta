import { Group, Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import FESmallInformationNotification from "src/components/fe-components/FESmallInformationNotification";
import FEInputModal from "src/components/FEInputModal";
import {
  DatePickerInput,
  FETimeInput,
  FETimeRangeInput,
  NumberInput,
  RadioGroup,
  SelectInput,
  TextArea,
  TextInput,
} from "src/components/FormInput";
import {
  feSeminarCoordinatorReferencesSchema,
  IFESeminarCoordinatorReferencesValues,
} from "./FESeminarCoordinatorReferenceInterfaces";

export interface IFESeminarCoordinatorReferenceModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
}

const FESeminarCoordinatorReferenceModal: React.FC<
  IFESeminarCoordinatorReferenceModal
> = ({ opened, setOpened, onSubmit }) => {
  const { onSubmit: onSubmitForm, ...form } =
    useForm<IFESeminarCoordinatorReferencesValues>({
      validate: yupResolver(feSeminarCoordinatorReferencesSchema),
    });

  const { getInputProps, errors, setValues, values } = form;

  return (
    <FEInputModal
      opened={opened}
      setOpened={
        ((e: boolean) => {
          setOpened(e);
          setValues({
            percentage: undefined,
            scoringName: undefined,
            scoringRangeEnd: undefined,
            scoringRangeStart: undefined,
            scoringType: undefined,
            seminarType: undefined,
            status: undefined,
          });
        }) as any
      }
      title={"Tambah Item Penilaian"}
      yesButtonLabel="Simpan"
      maxWidth={800}
      onSubmit={
        onSubmitForm(() => {
          onSubmit(values);
          setValues({
            percentage: undefined,
            scoringName: undefined,
            scoringRangeEnd: undefined,
            scoringRangeStart: undefined,
            scoringType: undefined,
            seminarType: undefined,
            status: undefined,
          });
        }) as any
      }
    >
      <Stack>
        <Group grow>
          <SelectInput
            label="Jenis Seminar"
            size="md"
            placeholder="Pilih Jenis Seminar"
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
            error={
              errors[
                "seminarType" as keyof IFESeminarCoordinatorReferencesValues
              ]
            }
          />
          <SelectInput
            label="Jenis Penilaian"
            placeholder="Pilih jenis penilaian"
            size="md"
            data={[
              {
                key: 0,
                value: "Presentasi",
                label: "Presentasi",
              },
              {
                key: 1,
                value: "Naskah",
                label: "Naskah",
              },
            ]}
            {...getInputProps("scoringType")}
            error={
              errors[
                "scoringType" as keyof IFESeminarCoordinatorReferencesValues
              ]
            }
          />
        </Group>
        <Group grow>
          <TextInput
            label="Nama Penilaian"
            size="md"
            {...getInputProps("scoringName")}
            error={
              errors[
                "scoringName" as keyof IFESeminarCoordinatorReferencesValues
              ]
            }
          />
        </Group>
        <Group grow>
          <NumberInput
            size="md"
            label="Rentang Nilai (awal)"
            className="self-end"
            {...getInputProps("scoringRangeStart")}
            error={
              errors[
                "scoringRangeStart" as keyof IFESeminarCoordinatorReferencesValues
              ]
            }
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            hideControls={false}
            max={100}
            min={0}
          />
          {/* <Text className="w-2 self-center mt-6 font-bold text-lg text-secondary-text-500">
              -
            </Text> */}
          <NumberInput
            size="md"
            label="Rentang Nilai (akhir)"
            className="self-end"
            {...getInputProps("scoringRangeEnd")}
            error={
              errors[
                "scoringRangeEnd" as keyof IFESeminarCoordinatorReferencesValues
              ]
            }
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            hideControls={false}
            max={100}
            min={0}
          />
        </Group>
        <Group grow>
          <NumberInput
            label="Persentase"
            size="md"
            placeholder="Masukkan persentase"
            {...getInputProps("percentage")}
            error={
              errors[
                "percentage" as keyof IFESeminarCoordinatorReferencesValues
              ]
            }
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            hideControls={false}
            max={100}
            min={0}
          />
          <RadioGroup
            label="Status"
            data={[
              {
                key: "0",
                label: "Aktif",
                value: "Aktif",
              },
              {
                key: "1",
                label: "Tidak Aktif",
                value: "Tidak Aktif",
              },
            ]}
            size={"md"}
            {...getInputProps("status")}
            error={
              errors["status" as keyof IFESeminarCoordinatorReferencesValues]
            }
          />
        </Group>
        {/* <TextInput
          label="Tempat"
          size="md"
          placeholder="Masukkan Tempat (luring) Pelaksanaan Seminar"
        /> */}
      </Stack>
    </FEInputModal>
  );
};
export default FESeminarCoordinatorReferenceModal;
