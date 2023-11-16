import { ROUTES } from '@/shared/const/routes';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';

export const ForbiddenPage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();

    return (
        <HStack max justify="center">
            <Button variant="clearGrey" onClick={() => router.push(ROUTES.HOME)}>
                {t("Redirect HOME")}
            </Button>
        </HStack>
    );
};
