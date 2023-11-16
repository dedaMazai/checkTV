import { HorizontalCarousel } from "@/entities/HorizontalCarousel";
import Image from "next/image";
import { HStack, VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/const/routes";
import useUser from "@/entities/User/user";
import { SwrProvider } from "@/app/providers/SwrProvider/SwrProvider";

import cls from "./MainPage.module.scss";

export const MainPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, mutate, error } = useUser();

  return (
    <SwrProvider>
      <VStack gap="16" max align="center">
        {JSON.stringify(user?.data)}
        <Button variant="clearGrey" onClick={() => router.push(ROUTES.FORBIDDEN)}>
          {t("Redirect")}
        </Button>
        <Card variant="greyOne" border="round" className={cls.imgCard}>
          <Image src="/images/test.jpg" alt="Landscape picture" className={cls.img} width={200} height={120} />
        </Card>
        <HStack gap="16">
          <LangSwitcher />
          <ThemeSwitcher />
        </HStack>
        <HorizontalCarousel />
      </VStack>
    </SwrProvider>
  );
};
