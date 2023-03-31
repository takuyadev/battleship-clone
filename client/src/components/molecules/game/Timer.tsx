import { Dispatch, SetStateAction, useEffect } from 'react';
import Loading from '@components/atoms/ui/Loading';
import Popup from '@components/atoms/ui/Popup';
import { useCountdown } from '@hooks/useCountdown';
import { TurnDelay } from '@models/enum.common';

export interface TimerProps {
  name: string;
  seconds: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const Timer = ({
  name,
  loading,
  seconds,
  className = '',
  setLoading,
}: TimerProps) => {

  const { startTimer, count, percentage } = useCountdown({
    duration: seconds,
    bufferTime: TurnDelay.BUFFER,
    onComplete: () => {
      setLoading(false);
    },
  });

  // If loading is true, then run timer again
  useEffect(() => {
    if (!loading) return;
    startTimer();
  }, [loading]);

  return (
    // Set count back to 0 on animation end
    <Popup isShow={loading} className={`${className} flex flex-col justify-center items-center`}>
      <p className='absolute z-30 font-bold text-white text-5xl'>{count}</p>
      <Loading percentage={percentage} />

      <p className='absolute bottom-1/4 text-white text-2xl'>
        <b>{name}</b>, please turn away from the screen!
      </p>
    </Popup>
  );
};

export default Timer;
