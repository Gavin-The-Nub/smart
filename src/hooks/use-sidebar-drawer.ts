import { useCallback, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

export function useSidebarDrawer(isOpen: boolean, onClose: () => void) {
  const isMobile = useIsMobile('lg'); // Use lg breakpoint (1024px)

  // Handle ESC key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  // Add/remove event listeners
  useEffect(() => {
    if (isMobile && isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Lock body scroll when drawer is open on mobile
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isMobile, isOpen, handleEscapeKey]);

  return { isMobile };
}