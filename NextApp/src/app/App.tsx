import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreProvider } from "./providers/StoreProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Toaster } from "react-hot-toast";
import { getUserInited, userActions } from "@/entities/User";
import { PageLoader } from "@/widgets/PageLoader";
import { Theme } from "@/shared/const/theme";

const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  // const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
  const { theme } = useTheme();
  // const dispatch = useAppDispatch();
  // const inited = useSelector(getUserInited);

  // useEffect(() => {
  //   if (!inited) {
  //     dispatch(userActions.initAuthData());
  //   }
  // }, [dispatch, inited]);

  // if (!inited) {
  //   return <PageLoader />;
  // }

  return (
    <div className={inter.className}>
      <StoreProvider>
        <ThemeProvider initialTheme={Theme.LIGHT}>
          <div id="app" className={classNames("app", {}, [theme])}>
            <div className="page">
              <Component {...pageProps} />
            </div>
            <Toaster position="bottom-right" />
          </div>
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
}
