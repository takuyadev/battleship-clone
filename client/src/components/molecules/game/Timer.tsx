import { Dispatch, useState, useEffect, SetStateAction } from 'react';
import Loading from '@components/atoms/ui/Loading';
import Popup from '@components/atoms/ui/Popup';
import { TurnDelay } from '@models/enum.common';

export interface TimerProps {
  name: string;
  seconds: number;
  setShow: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const Timer = ({ name, seconds, setShow, className }: TimerProps) => {
  const [count, setCount] = useState(0);
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    // Keep counter going down from provided seconds
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setPercentage((prev) => prev - 100 / (seconds / 1000));
    }, 1000);

    // Clears the counting interval first, so it stops at 5
    const countId = setTimeout(() => {
      clearInterval(intervalId);
      setShow(false);
    }, seconds + TurnDelay.BUFFER);

    // After 1 second, clear screen for smoother transition
    const loadingId = setTimeout(() => {
      setPercentage(100);
    }, seconds + TurnDelay.BUFFER + 250);

    return () => {
      clearInterval(intervalId);
      clearTimeout(loadingId);
      clearTimeout(countId);
    };
  }, [seconds]);

  return (
    // Set count back to 0 on animation end
    <Popup
      onAnimationEnd={() => setCount(0)}
      className={`${className && className}`}
    >
      <p className='absolute z-30 font-bold text-white text-5xl'>{count}</p>
      <Loading percentage={percentage} />

      <p className='absolute bottom-1/4 text-white text-2xl'>
        <b>{name}</b>, please turn away from the screen!
      </p>
    </Popup>
  );
};

export default Timer;
