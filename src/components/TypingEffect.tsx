import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export const TypingEffect = ({ text, className = "", speed = 50 }: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse border-r-2 border-current ml-1"></span>}
    </span>
  );
};