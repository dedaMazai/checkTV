import { AppRoutes } from "../types/router";

export const RoutePath: Record<AppRoutes, (...args: Array<string>) => string> = {
    [AppRoutes.MAIN]: () => '/',
    [AppRoutes.FORBIDDEN]: () => '/forbidden',
    [AppRoutes.NOT_FOUND]: () => '*',
};
