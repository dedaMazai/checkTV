import { queryClient } from "@/shared/api/apiQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function AppQueryProvider({ children }: { children?: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}