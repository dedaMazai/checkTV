import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    notAuthOnly?: boolean;
    withSidebar?: boolean;
    withFooter?: boolean;
};

export enum AppRoutes {
    MAIN = 'MAIN',
    FORBIDDEN = 'FORBIDDEN',
    // last
    NOT_FOUND = 'NOT_FOUND',
}