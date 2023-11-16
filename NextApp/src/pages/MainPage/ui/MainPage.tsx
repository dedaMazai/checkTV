import { HorizontalCarousel } from "@/entities/HorizontalCarousel";
import { Card } from "@/shared/ui/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
// import test from '@/shared/assets/img/test.jpg';
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import cls from "./MainPage.module.scss";

// export async function getStaticProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// }

export const MainPage = () => {
  return (
    <VStack gap="16" max align="center">
      {/* <Card variant='greyOne' border="round" className={cls.imgCard}>
                <img className={cls.img} src={test} />
            </Card> */}
      <HStack gap="16">
        <LangSwitcher />
        <ThemeSwitcher />
      </HStack>
      <HorizontalCarousel />
    </VStack>
  );
};
