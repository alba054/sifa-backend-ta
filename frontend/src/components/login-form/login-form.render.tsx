import ImageComponent from "@components/image.component";
import {
  Button,
  Group,
  Input,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  ILoginFormValues,
  TLoginInput,
} from "../../components/login-form/login-form.component";
import { COLORS, TEXT_COLORS } from "../../themes/colors.theme";
import Form from "../form.component";

interface ILoginFormRenderProps {
  isFocused: (input: TLoginInput) => boolean;
  clearFocus: () => void;
  changeFocusedInput: (input: TLoginInput) => void;
  onSubmit: (values: ILoginFormValues) => void;
}

const LoginFormRender: React.FC<ILoginFormRenderProps> = ({
  isFocused,
  clearFocus,
  changeFocusedInput,
  onSubmit,
}) => {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ILoginFormValues>();
  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={24} justify="space-between">
        <Group mb={32} align={"baseline"}>
          <div className={`relative w-20 h-24`}>
            <ImageComponent src={"/logos/unhas-logo.png"} layout="fill" />
          </div>
          <div className={`relative w-20 h-24`}>
            <ImageComponent src={"/logos/asiin-logo.png"} layout="fill" />
          </div>
          <div className={`relative w-16 h-20`}>
            <ImageComponent src={"/logos/lamkes-logo.png"} layout="fill" />
          </div>
        </Group>
        <Stack spacing={0}>
          <Title order={4}>{`${t("login-form-title")},`}</Title>
          <Text color={TEXT_COLORS.SECONDARY}>{`${t(
            "login-form-subtitle"
          )}.`}</Text>
        </Stack>
        <Stack spacing={8}>
          <Input.Wrapper
            label={t("username-input-label")}
            error={t(errors.username?.message || "")}
            labelProps={{
              style: {
                color: isFocused("username")
                  ? COLORS.PRIMARY
                  : TEXT_COLORS.PRIMARY,
              },
            }}
          >
            <Input
              {...register("username")}
              onFocus={() => changeFocusedInput("username")}
              onBlur={(e: any) => {
                register("username").onBlur(e);
                clearFocus();
              }}
              onChange={(e: any) => {
                register("username").onChange(e);
                trigger("username");
              }}
            />
          </Input.Wrapper>
          <Stack align={"baseline"} className={`w-full`}>
            <Input.Wrapper
              label={t("password-input-label")}
              error={t(errors.password?.message || "")}
              className={`w-full`}
              labelProps={{
                style: {
                  color: isFocused("password")
                    ? COLORS.PRIMARY
                    : TEXT_COLORS.PRIMARY,
                },
              }}
            >
              <PasswordInput
                onFocus={() => changeFocusedInput("password")}
                {...register("password")}
                onBlur={(e: any) => {
                  register("password").onBlur(e);
                  clearFocus();
                }}
                onChange={(e: any) => {
                  register("password").onChange(e);
                  trigger("password");
                }}
              />
              <Link className={`cursor-pointer`} href="#forget-password">
                <Text
                  align="right"
                  size={"sm"}
                  className={`cursor-pointer`}
                  color={COLORS.PRIMARY}
                >{`${t("forget-password-link-label")}?`}</Text>
              </Link>
            </Input.Wrapper>
          </Stack>
        </Stack>
        <Button type="submit" mt={4} className={`w-fit`}>
          {t("login-button-label")}
        </Button>
        <Group spacing={4} position="center">
          <Text>{`${t("no-account-question-text")}?`} </Text>
          <Link href={"#signup"}>
            <Text className={`cursor-pointer`} color={COLORS.PRIMARY}>
              {t("signup-link-label")}
            </Text>
          </Link>
        </Group>
      </Stack>
    </Form>
  );
};
export default LoginFormRender;
