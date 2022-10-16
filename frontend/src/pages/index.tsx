import { Button, Input, Text } from "@mantine/core";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import {
  generateDescription,
  generateHeadTitle,
} from "../functions/seo.function";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "footer"])),
      // Will be passed to the page component as props
    },
  };
};

export interface IHomepageProps {}

const Homepage: React.FC<IHomepageProps> = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("homapage-page-title"))}</title>
        <meta
          name="description"
          content={generateDescription(t("homepage-description"))}
        />
      </Head>

      <main className={``}>
        <Text color={"primary"} size={"sm"}>
          {t("homepage-title")}
        </Text>
        <Input />
      </main>
    </>
  );
};

export default Homepage;
