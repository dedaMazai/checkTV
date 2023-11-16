import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface StoreProviderProps {
  children?: ReactNode;
}

export const SwrProvider = (props: StoreProviderProps) => {
  const { children } = props;

  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        revalidateOnFocus: false,
        // dedupingInterval: 122000,
        // focusThrottleInterval: 122000,
        // loadingTimeout: 122000,
        // errorRetryInterval: 122000,
      }}
    >
      {children}
    </SWRConfig>
  );
};
