import { useState, useEffect, useRef } from 'react';

export interface Timer {
  id: string;
  duration: number;
  action: () => void;
}

const useTimers = (timers: Timer[], isActive: boolean): void => {
  const [timerIds, setTimerIds] = useState<number[]>([]);
  const timersRef = useRef(timers);

  useEffect(() => {
    timersRef.current = timers;
  }, [timers]);

  // useEffect(() => {
  //   if (isActive) {
  //     const newTimerIds = timers.map((timer) => {
  //       console.log('timer', timer);
  //       return window.setTimeout(timer.action, timer.duration);
  //     });
  //     setTimerIds(newTimerIds);
  //   }
  //   return () => {
  //     console.log('timerIds', timerIds);
  //     timerIds.forEach((timerId) => window.clearTimeout(timerId));
  //   };
  // }, [isActive]);

  useEffect(() => {
    if (isActive) {
      const newTimerIds = timersRef.current
        .filter((timer) => isActive && timer.duration)
        .map((timer) => {
          console.log('timer', timer);
          return window.setTimeout(timer.action, timer.duration);
        });
      setTimerIds(newTimerIds);
    } else {
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
      setTimerIds([]);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
      setTimerIds([]);
    }
  }, [isActive]);

};

export default useTimers;