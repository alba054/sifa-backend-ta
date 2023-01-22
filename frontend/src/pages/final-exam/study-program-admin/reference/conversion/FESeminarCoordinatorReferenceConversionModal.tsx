import { Group, Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import FEInputModal from "src/components/FEInputModal";
import { NumberInput, TextInput } from "src/components/FormInput";
import {
  feSeminarCoordinatorConversionReferencesSchema,
  IFESeminarCoordinatorConversionReferencesValues,
} from "./FESeminarCoordinatorReferenceConversionInterfaces";

export interface IFESeminarCoordinatorReferenceConversionModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
}

const FESeminarCoordinatorReferenceConversionModal: React.FC<
  IFESeminarCoordinatorReferenceConversionModal
> = ({ opened, setOpened, onSubmit }) => {
  const { onSubmit: onSubmitForm, ...form } =
    useForm<IFESeminarCoordinatorConversionReferencesValues>({
      validate: yupResolver(feSeminarCoordinatorConversionReferencesSchema),
    });

  const { getInputProps, errors, setValues, values } = form;

  return (
    <FEInputModal
      opened={opened}
      setOpened={
        ((e: boolean) => {
          setOpened(e);
          setValues({
            rubric: undefined,
            scoreBottomThreshold: undefined,
          });
        }) as any
      }
      title={"Tambah Aturan Konversi"}
      yesButtonLabel="Simpan"
      maxWidth={600}
      onSubmit={
        onSubmitForm(() => {
          onSubmit(values);
          setValues({
            rubric: undefined,
            scoreBottomThreshold: undefined,
          });
        }) as any
      }
    >
      <Stack>
        <TextInput
          label="Nilai (Huruf)"
          size="md"
          {...getInputProps("rubric")}
          error={
            errors[
              "rubric" as keyof IFESeminarCoordinatorConversionReferencesValues
            ]
          }
        />
        <Group grow>
          <NumberInput
            size="md"
            label="Batas Bawah Nilai"
            {...getInputProps("scoreBottomThreshold")}
            error={
              errors[
                "scoreBottomThreshold" as keyof IFESeminarCoordinatorConversionReferencesValues
              ]
            }
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            hideControls={false}
            max={100}
            min={0}
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
export default FESeminarCoordinatorReferenceConversionModal;
