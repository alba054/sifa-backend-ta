import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEProfileCard from "src/components/FEProfileCard";
import { FEPasswordInput } from "src/components/FormInput";
import * as yup from "yup";

export interface IFEProfileChangePassword {}

// const dummyProfileData

const SIZE = "md";

interface IFEEditProfileChangePasswordValues {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
}

export const feEditProfileFormSchema = yup.object({
  password: yup.string().required("Masukkan password lama terlebih dahulu"),
  newPassword: yup
    .string()
    .required("Masukkan password baru terlebih dahulu")
    .min(8, "Password minimal 8 karakter")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/,
      "Password harus terdiri dari minimal 1 angka"
    ),
  repeatNewPassword: yup
    .string()
    .required("Masukkan ulang Password baru terlebih dahulu")
    .oneOf([yup.ref("newPassword")], "Password tidak sama"),
});

const FEProfileChangePassword: React.FC<IFEProfileChangePassword> = ({}) => {
  const [isOpened, setIsOpened] = useState(false);
  const theme = useMantineTheme();

  const form = useForm<IFEEditProfileChangePasswordValues>({
    validate: yupResolver(feEditProfileFormSchema),
  });

  const { getInputProps, values, onSubmit, errors, setValues } = form;

  function handleSubmit(values: IFEProfileChangePassword) {
    setIsOpened(true);
  }

  function handleSubmitDelete() {
    console.log(values);
    // setValues({
    //   newPassword:undefined,
    //   password:undefined,
    //   repeatNewPassword:undefined,
    // })
    setIsOpened(false)
  }

  return (
    <FEProfileCard
      bg="bg-secondary-text-500"
      cardTitle="Ganti Password"
      cardTitleBottomBorderColor="bg-secondary-text-500"
    >
      <FEAlertModal
        opened={isOpened}
        setOpened={setIsOpened}
        title="Ganti Password?"
        description="Gunakan password baru Anda saat login berikutnya."
        yesButtonLabel="Ganti"
        onSubmit={onSubmit(handleSubmitDelete) as any}
      />
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack>
          <FEPasswordInput
            color={theme.colors["primary"][5]}
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
            <FEPasswordInput
              color={theme.colors["primary"][5]}
              size={SIZE}
              label="Password Baru"
              placeholder="Masukkan Password Baru"
              {...getInputProps("newPassword")}
              error={
                errors[
                  "newPassword" as keyof IFEEditProfileChangePasswordValues
                ]
              }
              inputWrapperOrder={["label", "input", "error", "description"]}
            />
            <FEPasswordInput
              color={theme.colors["primary"][5]}
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
          <Group className="justify-between">
            <Text className="text-secondary-text-500">
              Note: Password minimal 8 karakter dan harus mengandung huruf dan
              angka
            </Text>
            <Group className="flex flex-row-reverse" spacing={"lg"}>
              <Button
                variant="light"
                className=" bg-primary-500 !important font-bold text-base text-white rounded-lg hover:bg-primary-500"
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
          </Group>
        </Stack>
      </form>
    </FEProfileCard>
  );
};
export default FEProfileChangePassword;
