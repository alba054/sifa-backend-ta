import { Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import LoginFormComponent from "../components/login-form/login-form.component";
import {
  generateDescription,
  generateHeadTitle,
} from "../functions/seo.function";
import { TPage } from "../interfaces/page.interface";
import AuthLayout from "../layouts/auth.layout";

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
        <LoginFormComponent />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

(LoginPage as TPage).Layout = AuthLayout;

export default LoginPage;
