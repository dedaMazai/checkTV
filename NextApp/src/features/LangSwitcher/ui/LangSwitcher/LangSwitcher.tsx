import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = () => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button onClick={toggle} fullHeight variant="clearGrey">
      {t("Язык")}
    </Button>
  );
};
