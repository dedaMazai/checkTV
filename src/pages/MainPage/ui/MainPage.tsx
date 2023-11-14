import { HorizontalCarousel } from '@/entities/HorizontalCarousel';
import { Card } from '@/shared/ui/Card';
import {  HStack, VStack } from '@/shared/ui/Stack';
import test from '@/shared/assets/img/test.jpg';
import { Counter } from '@/entities/Counter';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import cls from './MainPage.module.scss';

const MainPage = () => {
    return (
        <VStack gap="16" max align="center">
            <Card variant='greyOne' border="round" className={cls.imgCard}>
                <img className={cls.img} src={test} />
            </Card>
            <HStack gap="16">
                <LangSwitcher />
                <ThemeSwitcher />
            </HStack>
            <Counter />
            <HorizontalCarousel />
        </VStack>
    );
};

export default MainPage;
