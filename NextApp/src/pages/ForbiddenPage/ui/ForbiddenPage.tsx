import { HStack } from '@/shared/ui/Stack';
import { useTranslation } from "next-i18next";

export const ForbiddenPage = () => {
    const { t } = useTranslation('common');

    return (
        <HStack max justify="center">
            {t('У вас нет доступа к этой странице')}
        </HStack>
    );
};
