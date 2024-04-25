/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
import {
  useEffect, useState,
} from 'react';
import cls from './Text.module.scss';

export const Typography = (props) => {
  const {
    className,
    text,
    align = 'left',
    size = 32,
    bold,
    wrap,
    ellipsis,
    style,
    marquee,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(text);
  }, [text]);

  const TextTag = marquee
    ? 'marquee'
    : 'p';

  return (
    <div
      className={`${cls.Text} ${bold
        ? cls.bold
        : ''} ${wrap
        ? cls.wrap
        : ''}`}
    >
      {value && (
        <TextTag
          className={`${cls.text} ${ellipsis
            ? cls.ellipsis
            : ''}`}
          style={{
            ...style,
            textAlign: align,
            fontSize: `${size}px`,
          }}
        >
          {value}
        </TextTag>
      )}
    </div>
  );
};
