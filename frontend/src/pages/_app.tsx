import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";

const DefaultLayout = ({ children }: any) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || DefaultLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
