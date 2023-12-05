import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'main' | 'gray' | 'second' | 'red' | 'white' | 'black' | 'green';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 5 | 4 | 3 | 2 | 1;

interface TextProps {
    className?: string;
    title?: string | number;
    text?: string | number;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    wrap?: boolean;
    ellipsis?: boolean;
    style?: CSSProperties;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4';

const mapSizeToClass: Record<TextSize, string> = {
    '5': cls.size_s,
    '4': cls.size_m,
    '3': cls.size_l,
    '2': cls.size_xl,
    '1': cls.size_max,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    '5': 'h4',
    '4': 'h3',
    '3': 'h2',
    '2': 'h1',
    '1': 'h1',
};

export const Typography = (props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = '4',
        bold,
        wrap,
        ellipsis,
        style,
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [className, cls[variant], cls[align], sizeClass];

    return (
        <div
            style={style}
            className={classNames(
                cls.Text,
                {
                    [cls.bold]: bold,
                    [cls.wrap]: wrap,
                },
                additionalClasses,
            )}
        >
            {title && (
                <HeaderTag
                    className={classNames(cls.title, { [cls.ellipsis]: ellipsis })}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p
                    className={classNames(cls.text, { [cls.ellipsis]: ellipsis })}
                >
                    {text}
                </p>
            )}
        </div>
    );
};
