import { Group, Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect } from "react";
import FEInputModal from "src/components/FEInputModal";
import { NumberInput, TextInput } from "src/components/FormInput";
import {
  feSeminarCoordinatorConversionReferencesSchema,
  IFESeminarCoordinatorConversionReferencesValues,
} from "./FESeminarCoordinatorReferenceConversionInterfaces";

export interface IFESeminarCoordinatorReferenceConversionEditModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
  rubric: string;
  scoreBottomThreshold: number;
}

const FESeminarCoordinatorReferenceConversionEditModal: React.FC<
  IFESeminarCoordinatorReferenceConversionEditModal
> = ({ opened, setOpened, onSubmit, rubric, scoreBottomThreshold }) => {
  const { onSubmit: onSubmitForm, ...form } =
    useForm<IFESeminarCoordinatorConversionReferencesValues>({
      validate: yupResolver(feSeminarCoordinatorConversionReferencesSchema),
    });

  const { getInputProps, errors, setValues, values } = form;

  useEffect(() => {
    setValues({
      rubric: rubric,
      scoreBottomThreshold: scoreBottomThreshold,
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
      title={"Edit Aturan Konversi"}
      yesButtonLabel="Ubah"
      maxWidth={600}
      onSubmit={
        onSubmitForm(() => {
          onSubmit(values);
        }) as any
      }
    >
      <Stack>
        <TextInput
          defaultValue={rubric}
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
            defaultValue={scoreBottomThreshold}
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
export default FESeminarCoordinatorReferenceConversionEditModal;
