/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
import React, { PureComponent } from 'react';
import cls from './Text.module.scss';

export default class Typography extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
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
    } = this.props;

    const TextTag = marquee
      ? 'marquee'
      : 'p';

    return (
      <div
        className={`${cls.Text} ${bold ? cls.bold : ''} ${wrap ? cls.wrap : ''}`}
      >
        {text && (
          <TextTag
            className={`${cls.text} ${ellipsis ? cls.ellipsis : ''}`}
            style={{
              ...style,
              textAlign: align,
              fontSize: `${size}px`,
            }}
          >
            {text}
          </TextTag>
        )}
      </div>
    );
  }
}
