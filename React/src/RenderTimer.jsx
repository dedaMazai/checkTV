import {
  useEffect, useState,
} from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Typography } from './Typography';

function formatTime(date, withSeconds) {
  const hour = date.getHours()
    .toString();
  const minute = date.getMinutes()
    .toString();
  const second = date.getSeconds()
    .toString();

  if (withSeconds) {
    return `${hour}:${minute}:${second}`;
  }

  return `${hour}:${minute}`;
}

export const RenderTimer = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [value, setValue] = useState(dayjs());
  useEffect(() => {
    const interval = setInterval(
      () => setValue(dayjs()),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography
      size={34}
      style={{
        marginBottom: 0,
        color: 'black',
      }}
      bold
      text={formatTime(new Date(value), true)}
    />
  );
};
