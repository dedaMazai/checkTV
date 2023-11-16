import { HorizontalCarousel } from "@/entities/HorizontalCarousel";
import { HStack, VStack } from "@/shared/ui/Stack";
import { LangSwitcher } from "@/features/LangSwitcher";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";

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
