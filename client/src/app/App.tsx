import type { AppProps } from "next/app";
import { AppQueryProvider } from "./providers/providers";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
      if (!inited) {
          dispatch(userActions.initAuthData());
      }
  }, [dispatch, inited]);

  if (!inited) {
      return (
          <PageLoader />
      );
  }

  return (
    <AppQueryProvider>
      <div className={inter.className}>
        <StoreProvider>
              <ThemeProvider initialTheme={defaultTheme}>
                  <div id="app" className={classNames('app', {}, [theme])}>
                          <div className="page">
                            <Component {...pageProps} />
                          </div>
                      <Toaster position="bottom-right" />
                  </div>
              </ThemeProvider>
          </StoreProvider>
      </div>
    </AppQueryProvider>
  );
}
