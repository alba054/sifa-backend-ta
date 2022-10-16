import ImageComponent from "@components/image.component";
import { Container, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import LoginLineVectorIcon from "src/assets/login-line-vector.icon";
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

      <Stack className={`col-span-1 relative`} justify="end" align={"end"}>
        <div className={`absolute w-[95%] h-screen`}>
          <div className={`relative w-full h-screen`}>
            <ImageComponent
              objectFit="cover"
              src={"/logos/auth-page-line.png"}
              layout="fill"
            />
          </div>
        </div>
        <div className={`relative w-[90%] h-screen`}>
          <ImageComponent
            objectFit="cover"
            src={"/logos/login-vector.png"}
            layout="fill"
          />
        </div>
      </Stack>
    </div>
  );
};

export default AuthLayout;
