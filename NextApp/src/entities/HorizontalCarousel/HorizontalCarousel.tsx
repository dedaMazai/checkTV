import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Typography } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';

import './HorizontalCarousel.scss';
import cls from './HorizontalCarousel.module.scss';

interface HorizontalCarouselProps {
    className?: string
}

export const HorizontalCarousel = (props: HorizontalCarouselProps) => {
    const { t } = useTranslation('common');

    const CONTENT = [
        {
            text: t(' Очень круто!'),
            person: t('@Сергей Н.'),
        },
        {
            text: t('Выричен!'),
            person: t('@Виктор С.'),
        },
        {
            text: t('Средиорости!'),
            person: t('@Илья Б.'),
        },
        {
            text: t('Был впечатгло!'),
            person: t('@Константин П.'),
        },
        {
            text: t('Уверена, это существенно пь!'),
            person: t('@Мария Т.'),
        },
        {
            text: t('Пнтов, что я использовал. Мне нравится!'),
            person: t('@Светлана В.'),
        }
    ];

    return (
        <div className={classNames(cls.carousel)}>
            <div className="items-wrap">
                <div className="items marquee reverce">
                    {CONTENT.map((element, index) => (
                        <div className="item" key={index}>
                            <Card style={{ width: '285px' }} padding='24'>
                                <VStack max gap="16">
                                    <Typography text={element.text} />
                                    <Typography text={element.person} variant="gray" bold />
                                </VStack>
                            </Card>
                        </div>
                    ))}
                </div>
                <div aria-hidden="true" className="items marquee reverce">
                    {CONTENT.map((element, index) => (
                        <div className="item" key={index}>
                            <Card style={{ width: '285px' }} padding='24'>
                                <VStack max gap="16">
                                    <Typography text={element.text} />
                                    <Typography text={element.person} variant="gray" bold />
                                </VStack>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
