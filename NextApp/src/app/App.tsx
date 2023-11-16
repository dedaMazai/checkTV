
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { classNames } from "@/shared/lib/classNames/classNames";
import { appWithTranslation } from "next-i18next";

const inter = Inter({ subsets: ["latin"] });
function App({ Component, pageProps }: AppProps) {

  return (
    <div id="app" className={classNames("app", inter.className)}>
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);