import { Children, cloneElement, ReactElement } from 'react';
import { Reveal } from './Reveal';

interface StaggerProps {
  children: React.ReactNode;
  baseDelay?: number;
  step?: number;
  className?: string;
}

export const Stagger = ({ 
  children, 
  baseDelay = 0, 
  step = 100, 
  className = ''
}: StaggerProps) => {
  const childArray = Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <Reveal
          key={index}
          delay={baseDelay + (index * step)}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
};