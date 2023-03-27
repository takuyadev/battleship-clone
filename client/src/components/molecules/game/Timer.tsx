import Loading from '@components/atoms/ui/Loading/Loading';
import React, { Dispatch, useState, useEffect, SetStateAction } from 'react';

export interface TimerProps {
  seconds: number;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Timer = ({ seconds, setShow }: TimerProps) => {
  const [count, setCount] = useState(0);
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setPercentage((prev) => prev - 100 / seconds);
    }, 1000);

    const timeoutId = setTimeout(
      () => {
        setCount(0);
        setShow(false);
        setPercentage(100);
        clearInterval(intervalId);
      },
      seconds * 1000 + 1000
    );

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [seconds]);

  return (
    <div className='relative w-48 h-48'>
      <p className='absolute font-bold text-xl left-[calc(50%-6px)] top-[calc(50%-15px)]'>
        {count}
      </p>
      <Loading percentage={percentage} />
    </div>
  );
};

export default Timer;
