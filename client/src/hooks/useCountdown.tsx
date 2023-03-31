import { useState, useEffect } from 'react';
import { CountDownState } from './models/interfaces/interfaces.countdown';

function useCountdown({
  duration,
  bufferTime = 0,
  onComplete,
}: CountDownState) {
  const [count, setCount] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const [active, setIsActive] = useState(true);

  useEffect(() => {
    // If active is false, then never run timer
    if (!active) return;

    // Countdown the timer
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setPercentage((prev) => prev - 100 / (duration / 1000));
    }, 1000);

    // 
    const countId = setTimeout(() => {
      clearInterval(intervalId);
    }, duration + bufferTime);

    // On complete, run callback and reset counter
    const onCompleteId = setTimeout(() => {
      setIsActive(false);
      setCount(0);
      setPercentage(100)

      // Run callback complete function
      onComplete();
    }, duration + bufferTime + 500);

    return () => {
      clearInterval(intervalId);
      clearInterval(onCompleteId);
      clearTimeout(countId);
    };

  }, [active]);

  // Start the timer by setting the active state
  const startTimer = () => {
    setCount(0);
    setPercentage(100);
    setIsActive(true);
  };

  return { count, percentage, startTimer };
}

export { useCountdown };
