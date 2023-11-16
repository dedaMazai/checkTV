import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from "next-i18next";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { t } = useTranslation('common');

    // const onToggleHandler = useCallback(() => {
    //     toggleTheme();
    // }, [dispatch, toggleTheme]);

    return (
        <Button
            variant="clearGrey"
            className={classNames(className)}
            // onClick={onToggleHandler}
            fullHeight
        >
            {t('Тема')}
        </Button>
    );
};
