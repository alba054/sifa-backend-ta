import { Container, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "next-i18next";
import React from "react";
import { TEXT_COLORS } from "../themes/colors.theme";

interface IDefaultLayoutProps {
  children: any;
}

const AuthLayout: React.FC<IDefaultLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className={`grid min-h-screen grid-cols-2 gap-x-8`}>
      <Stack justify={"space-between"} className={`col-span-1`} py={32} pl={40}>
        <div>{children}</div>

        <Text color={TEXT_COLORS.SECONDARY}>{t("copyright-text")}</Text>
      </Stack>

      <div className={`col-span-1`}>Here'll be the image</div>
    </div>
  );
};

export default AuthLayout;
