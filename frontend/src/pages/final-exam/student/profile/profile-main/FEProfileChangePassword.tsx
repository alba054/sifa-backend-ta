import { Button, Group, Stack, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import FEProfileCard from "src/components/FEProfileCard";
import { TextInput } from "src/components/FormInput";
import * as yup from "yup";

export interface IFEProfileChangePassword {}

const SIZE = "md";

interface IFEEditProfileChangePasswordValues {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

export const feEditProfileFormSchema = yup.object({
  password: yup.string().required("Masukkan Password Lama Terlebih Dahulu"),
  newPassword: yup.string().required("Masukkan Password Baru Terlebih Dahulu"),
  repeatNewPassword: yup
    .string()
    .required("Masukkan Ulang Password Baru Terlebih Dahulu"),
});

const FEProfileChangePassword: React.FC<IFEProfileChangePassword> = ({}) => {
  const { getInputProps, values, onSubmit, errors } =
    useForm<IFEEditProfileChangePasswordValues>({
      validate: yupResolver(feEditProfileFormSchema),
    });

  function handleSubmit(values: IFEProfileChangePassword) {
    console.log(values);
  }
  return (
    <FEProfileCard bg="bg-secondary-text-500">
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack className="w-fit gap-1 mb-4">
          <Title order={3} className="text-primary-text-500">
            Ganti Password
          </Title>
          <div className={`bg-secondary-text-500 w-1/2 pb-1 rounded-sm`} />
        </Stack>
        <Stack>
          <TextInput
            size={SIZE}
            label="Password Lama"
            placeholder="Masukkan Password Lama"
            {...getInputProps("password")}
            error={
              errors["password" as keyof IFEEditProfileChangePasswordValues]
            }
          />
          <Group
            grow
            classNames={{ label: { backgroundColour: "000000" } }}
            className="flex items-start"
          >
            <TextInput
              size={SIZE}
              label="Password Baru"
              placeholder="Masukkan Password Baru"
              {...getInputProps("newPassword")}
              error={
                errors[
                  "newPassword" as keyof IFEEditProfileChangePasswordValues
                ]
              }
              description="Note: Password minimal 8 karakter dan harus mengandung huruf dan angka"
              inputWrapperOrder={["label", "input", "error", "description"]}
            />
            <TextInput
              size={SIZE}
              label="Ulangi Password Baru"
              placeholder="Masukkan Kembali Password Baru"
              {...getInputProps("repeatNewPassword")}
              error={
                errors[
                  "repeatNewPassword" as keyof IFEEditProfileChangePasswordValues
                ]
              }
              inputWrapperOrder={["label", "input", "error", "description"]}
            />
          </Group>
          <Group className="flex flex-row-reverse" spacing={"lg"}>
            <Button
              variant="light"
              className=" bg-primary-500 !important font-bold text-base text-white py-[12px] px-[16px] w-[154px] h-[46px] rounded-lg hover:bg-primary-500"
              type="submit"
            >
              Ubah Password
            </Button>

            <Button
              variant="light"
              className=" bg-white !important font-bold text-base text-primary-500 hover:bg-transparent"
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </FEProfileCard>
  );
};
export default FEProfileChangePassword;
