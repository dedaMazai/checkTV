import { SwrProvider } from '@/app/providers/SwrProvider/SwrProvider';
import useUser from '@/entities/User/user';
import { ROUTES } from '@/shared/const/routes';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';

export const ForbiddenPage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { user, mutate, error } = useUser();

    return (
        <SwrProvider>
            <VStack max justify="center">
                {JSON.stringify(user?.data)}
                <Button variant="clearGrey" onClick={() => router.push(ROUTES.HOME)}>
                    {t("Redirect HOME")}
                </Button>
            </VStack>
        </SwrProvider>
    );
};
