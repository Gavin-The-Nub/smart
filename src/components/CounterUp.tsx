import { useState, useEffect } from 'react';

interface CounterUpProps {
  end: number;
  duration?: number;
  start?: number;
}

export const CounterUp = ({ end, duration = 2000, start = 0 }: CounterUpProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (start === end) return;

    const increment = end / (duration / 16); // 60fps
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev + increment >= end) {
          clearInterval(timer);
          return end;
        }
        return prev + increment;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, start]);

  return <span>{Math.floor(count)}</span>;
};