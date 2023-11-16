import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { classNames } from "@/shared/lib/classNames/classNames";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config.js";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });
function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div id="app" className={classNames("app", inter.className)}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
