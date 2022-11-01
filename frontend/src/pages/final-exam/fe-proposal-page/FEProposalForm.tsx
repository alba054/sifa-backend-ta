import { Stack, Input, Group, Button, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm, UseFormReturnType, yupResolver } from "@mantine/form";
import React from "react";
import ArrowUploadIcon from "src/assets/Icons/ArrowUploadIcon";
import {
  getDefaultStyle,
  RadioGroup,
  SelectInput,
  TextArea,
  TextInput,
} from "src/components/FormInput";
import { IFEProposalFormValues } from "./FEProposalInterfaces";

interface IFEProposalFormProps {
  form: Omit<UseFormReturnType<IFEProposalFormValues>, "onSubmit">;
}

const FEProposalForm: React.FC<IFEProposalFormProps> = ({ form }) => {
  const { getInputProps, errors, setValues } = form;

  function handleDrop(files: File[]) {}

  return (
    <Stack spacing={"sm"}>
      <TextInput
        required
        label="Judul yang diusulkan"
        placeholder="Input judul"
        size="sm"
        {...getInputProps("title")}
        error={errors["title" as keyof IFEProposalFormValues]}
      />
      <div className={`grid gap-x-4 grid-cols-2`}>
        <div className={`col-span-1`}>
          <SelectInput
            required
            size="sm"
            {...getInputProps("laboratory")}
            error={errors["laboratory" as keyof IFEProposalFormValues]}
            data={[
              { value: "Test 1", label: "Value 1" },
              { value: "Test 2", label: "Value 2" },
            ]}
            label="Laboratorium"
            placeholder="Pilih laboratorium"
          />
        </div>
        <div className={`col-span-1`}>
          <SelectInput
            {...getInputProps("mainLecturer")}
            error={errors["mainLecturer" as keyof IFEProposalFormValues]}
            data={[
              { value: "Test 1", label: "Value 1" },
              { value: "Test 2", label: "Value 2" },
            ]}
            required
            label="Pembimbing utama yang diusulkan"
            placeholder="Pilih pembimbing"
            size="sm"
          />
        </div>
      </div>
      <div className={`grid gap-x-4 grid-cols-2`}>
        <Input.Wrapper
          styles={getDefaultStyle(false, false)}
          size="sm"
          required
          label="File draf proposal"
        >
          <Group my={4}>
            <Dropzone
              {...getInputProps("proposalFile")}
              error={errors["proposalFile" as keyof IFEProposalFormValues]}
              padding={0}
              className={`w-fit border-none`}
              onDrop={handleDrop}
            >
              <Button className={`!bg-secondary-text-50`}>
                <ArrowUploadIcon size={12} />
                <Text ml={"xs"} color={"primary-text"}>
                  Choose File
                </Text>
              </Button>
            </Dropzone>

            <Text size="sm">Belum ada file yang di upload</Text>
          </Group>
          <Text size="xs" color="secondary-text">
            *Ekstensi file yang diperbolehkan adalah pdf atau docx
          </Text>
        </Input.Wrapper>
        <RadioGroup
          {...getInputProps("isHaveLecturerDecree")}
          error={errors["isHaveLecturerDecree" as keyof IFEProposalFormValues]}
          required
          label="Sudah memiliki SK pembimbing dan penguji?"
          data={[
            { label: "Sudah", value: true },
            { label: "Belum", value: false },
          ]}
          size="sm"
          onChange={(value) => {
            setValues((val) => ({
              ...val,
              isHaveLecturerDecree: JSON.parse(value),
            }));
          }}
        />
      </div>

      <TextArea
        {...getInputProps("note")}
        error={errors["note" as keyof IFEProposalFormValues]}
        label="Catatan (Opsional)"
        size="sm"
      />
    </Stack>
  );
};
export default FEProposalForm;
