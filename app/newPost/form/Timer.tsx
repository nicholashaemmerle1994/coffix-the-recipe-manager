import { useState } from 'react';
import styles from './form.module.scss';

export const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinutes(parseInt(event.target.value));
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeconds(parseInt(event.target.value));
  };

  const minuteOptions = Array.from({ length: 6 }, (_, i) => (
    <option key={`minute-${i}`} value={i}>
      {i.toString().padStart(2, '0')}
    </option>
  ));

  const secondOptions = Array.from({ length: 60 }, (_, i) => (
    <option key={`second-${i}`} value={i}>
      {i.toString().padStart(2, '0')}
    </option>
  ));

  return (
    <div className={styles.div}>
      Brew Time:
      <select name="minutes" value={minutes} onChange={handleMinutesChange}>
        {minuteOptions}
      </select>
      <span>:</span>
      <select name="seconds" value={seconds} onChange={handleSecondsChange}>
        {secondOptions}
      </select>
    </div>
  );
};
