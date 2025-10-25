import { useState, useEffect } from 'react';

interface TextEffectProps {
  text1: string;
  text2: string;
  period?: number;
}

export const TextEffect = ({ text1, text2, period = 3000 }: TextEffectProps) => {
  const [currentText, setCurrentText] = useState(text1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const texts = [text1, text2];
    const handleType = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, text1, text2, period, typingSpeed]);

  return (
    <span className="typewrite">
      <span>{currentText}</span>
      <span className="animate-pulse">|</span>
    </span>
  );
};