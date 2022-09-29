import { Text } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";
import {
  generateDescription,
  generateHeadTitle,
} from "../functions/seo.function";
import { TPage } from "../interfaces/page.interface";
import DefaultLayout from "../layouts/default.layout";

interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("loginpage-page-title"))}</title>
        <meta
          name="description"
          content={generateDescription(t("loginpage-page-description"))}
        />
      </Head>
      <div>
        <Text>Halo</Text>
      </div>
    </>
  );
};

(LoginPage as TPage).Layout = DefaultLayout;

export default LoginPage;
