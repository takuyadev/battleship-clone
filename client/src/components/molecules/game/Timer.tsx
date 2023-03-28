import { Dispatch, useState, useEffect, SetStateAction } from 'react';
import Loading from '@components/atoms/ui/Loading';
import Popup from '@components/atoms/ui/Popup';

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
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setPercentage((prev) => prev - 100 / (seconds / 1000));
    }, 1000);

    const timeoutId = setTimeout(() => {
      setCount(0);
      setShow(false);
      setPercentage(100);
      clearInterval(intervalId);
    }, seconds + 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [seconds]);

  return (
    <Popup className={`${className && className}`}>
      <p className='absolute z-30 font-bold text-white text-5xl'>{count}</p>
      <Loading percentage={percentage} />
      
      <p className='absolute bottom-1/4 text-white text-2xl'>
        <b>{name}</b>, please turn away from the screen!
      </p>
    </Popup>
  );
};

export default Timer;
