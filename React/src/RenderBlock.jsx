/* eslint-disable no-useless-constructor */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React, { Component } from 'react';
import { determinateText } from './helpers/text';
import Typography from './Typography';
import cls from './ScreenBlock.module.scss';

export default class RenderBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      element,
      resizable,
      style,
      clientEnvironments,
    } = this.props;

    let text = (element.properties && element.properties.value && element.properties.value.result) || '';

    const arrayFromValue = element.properties && element.properties.value && element.properties.value.result.split(' / ');
    const templateVariableName = arrayFromValue && arrayFromValue[0] === 'Template' && arrayFromValue[1];
    const templateVariable = templateVariableName
    && clientEnvironments && clientEnvironments.screenVariables
    && clientEnvironments.screenVariables[templateVariableName];

    if (templateVariable && templateVariable.name === 'multipleString') {
      const resultText = templateVariable
      && templateVariable.multipleString && templateVariable.multipleString.reduce((acc, el) => {
        let { value } = el;
        const { type } = el;
        const arrayFromInnerValue = value.split(' / ');

        if (
          clientEnvironments
          && clientEnvironments.socketVariables
          && clientEnvironments.lang
          && arrayFromInnerValue
          && arrayFromInnerValue.length
          && type !== 'text'
        ) {
          const {
            socketVariables,
            isIterable,
            lang,
            countPage,
            screenVariables,
          } = clientEnvironments;

          const newText = determinateText(
            socketVariables,
            arrayFromInnerValue,
            element,
            lang,
            countPage,
            isIterable,
          );

          if (newText) {
            value = newText;
          }
        }

        return (acc
          ? `${acc}${templateVariable.separator || ''}${value}`
          : value);
      }, '');

      if (resultText) {
        text = resultText;
      }
    } else if (
      clientEnvironments
        && arrayFromValue
        && arrayFromValue.length
        && element.properties
        && element.properties.value
        && element.properties.value.type !== 'text'
        && clientEnvironments.lang
        && clientEnvironments.socketVariables
    ) {
      const {
        socketVariables,
        isIterable,
        lang,
        countPage,
      } = clientEnvironments;

      const newText = determinateText(
        socketVariables,
        arrayFromValue,
        element,
        lang,
        countPage,
        isIterable,
      );

      if (newText) {
        text = newText;
      }
    }

    const ComponentsMap = {
      ElementText: (
        <div
          style={{
            width: resizable
              ? 'inherit'
              : element.width,
            height: resizable
              ? 'inherit'
              : element.height,
            background: element.properties && element.properties.background,
            overflow: 'hidden',
          }}
        >
          <Typography
            size={element.properties && element.properties.size}
            style={{
              color: element.properties && element.properties.color,
            }}
            marquee={element.properties && element.properties.isMarquee}
            bold={element.properties && element.properties.bold}
            text={text}
          />
        </div>
      ),
      ElementBlock: (
        <div
          style={{
            width: resizable
              ? 'inherit'
              : element.width,
            height: resizable
              ? 'inherit'
              : element.height,
            background: element.properties && element.properties.background,
            borderRadius: `${element.properties && element.properties.borderRadius}px`,
          }}
        />
      ),
    };

    return (
      <div
        style={style}
        className={cls.RenderBlock}
      >
        {ComponentsMap[element.name]}
      </div>
    );
  }
}
