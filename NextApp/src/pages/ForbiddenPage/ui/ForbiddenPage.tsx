import { SwrProvider } from '@/app/providers/SwrProvider/SwrProvider';
import useUser from '@/entities/User/user';
import { ROUTES } from '@/shared/const/routes';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { useTranslation } from "next-i18next";
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ForbiddenPage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { user, mutate, error } = useUser();

    return (
        <SwrProvider>
            <VStack max justify="center">
                {JSON.stringify(user?.data)}
                <Link href={ROUTES.HOME}>
                    <Button fullHeight variant="clearGrey">
                    {t("Redirect HOME")}
                    </Button>
                </Link>
            </VStack>
        </SwrProvider>
    );
};
