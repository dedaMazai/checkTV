import { HorizontalCarousel } from "@/entities/HorizontalCarousel";
import Image from 'next/image'
import { HStack, VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Card } from "@/shared/ui/Card";

import cls from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <VStack gap="16" max align="center">
        <Card variant='greyOne' border="round" className={cls.imgCard}>
          <Image
            src="/images/test.jpg"
            alt="Landscape picture"
            className={cls.img}
            width={200}
            height={120}
          />
        </Card>
      <HStack gap="16">
        <LangSwitcher />
        <ThemeSwitcher />
      </HStack>
      <HorizontalCarousel />
    </VStack>
  );
};
