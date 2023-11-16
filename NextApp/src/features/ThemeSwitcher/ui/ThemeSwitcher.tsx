import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useCallback } from "react";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { t } = useTranslation("common");
  const { theme, setTheme } = useTheme();

  const onToggleHandler = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <Button
      variant="clearGrey"
      className={classNames(className)}
      onClick={onToggleHandler}
      fullHeight
    >
      {t("qqq")}
    </Button>
  );
};
