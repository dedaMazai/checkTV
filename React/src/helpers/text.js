function formatTime(date, withSeconds) {
  const hour = date.getHours()
    .toString()
    .padStart(2, '0');
  const minute = date.getMinutes()
    .toString()
    .padStart(2, '0');
  const second = date.getSeconds()
    .toString()
    .padStart(2, '0');

  if (withSeconds) {
    return `${hour}:${minute}:${second}`;
  }

  return `${hour}:${minute}`;
}

export const traverseObject = (array, obj) => {
  let result = obj;

  for (let i = 0; i < array.length; i++) {
    const key = array[i];

    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      return undefined;
    }
  }

  return result;
};

export const determinateText = (
  socketVariables,
  arrayFromValue,
  element,
  lang,
  countPage,
  isIterable,
) => {
  if (isIterable) {
    arrayFromValue.shift();
  }

  let language = 'rus';
  const checkLang = element.property.lang === 'global' || !element.property.lang
    ? lang
    : element.property.lang;

  switch (checkLang) {
    case 'ru':
      language = 'rus';

      break;
    case 'en':
      language = 'eng';

      break;
    case 'zh':
      language = 'zho';

      break;
    default:
      language = 'rus';
  }

  let resultText = traverseObject(arrayFromValue, socketVariables);

  if (resultText && countPage !== undefined && Array.isArray(resultText)) {
    resultText = resultText[countPage];
  }

  if (resultText && typeof resultText === 'object') {
    resultText = resultText[language];
  }

  if (resultText && typeof resultText !== 'object') {
    return element.property?.value?.type === 'time'
      ? formatTime(new Date(resultText * 1000), element.property.withSeconds)
      : resultText;
  }

  if (socketVariables && !resultText) {
    return ' ';
  }

  return null;
};
