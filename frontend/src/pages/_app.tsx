import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "../themes/mantine.theme";

const DefaultLayout = ({ children }: any) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || DefaultLayout;

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={mantineTheme}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}

export default appWithTranslation(MyApp);
