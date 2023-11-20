import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export var LangSwitcher = function() {
  var { t, i18n } = useTranslation();

  return (
    <Link href="/" locale={i18n.language === "ru" ? "en" : "ru"}>
      <Button fullHeight variant="clearGrey">
        {t("Язык")}
      </Button>
    </Link>
  );
};
