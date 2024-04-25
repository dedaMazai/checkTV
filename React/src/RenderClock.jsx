import {
  useEffect, useState,
} from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export const RenderClock = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(
      () => setValue(new Date()),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    // <Clock
    //   value={new Date(value)}
    //   size={150}
    // />
    <div />
  );
};
