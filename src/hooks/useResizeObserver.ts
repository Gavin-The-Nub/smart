import { useEffect, useRef, useState } from 'react';

interface DOMRectSize {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>(): [
  React.RefObject<T>, 
  DOMRectSize | undefined
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<DOMRectSize>();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}