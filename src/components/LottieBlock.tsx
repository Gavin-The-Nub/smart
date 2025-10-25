import React, { useEffect, useRef } from "react";

// Declare the lottie-player custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': {
        src?: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
        style?: React.CSSProperties;
        ref?: React.RefObject<any>;
      };
    }
  }
}

export default function LottieBlock({
  src,
  title,
  className = "",
  width = 320,
  height = 320,
}: {
  src: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import the lottie-player if not already loaded
    if (!customElements.get('lottie-player')) {
      import('@lottiefiles/lottie-player');
    }
  }, []);

  return (
    <div className={className} aria-label={title || "animation"}>
      <lottie-player
        ref={playerRef}
        src={src}
        background="transparent"
        speed="1"
        loop
        autoplay
        style={{ width, height }}
      />
    </div>
  );
}
