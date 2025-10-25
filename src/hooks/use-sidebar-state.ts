import { useState, useEffect } from 'react';

export function useSidebarState() {
  const [isExpanded, setIsExpanded] = useState(() => {
    // Try to get the state from localStorage, default to true if not found
    const saved = localStorage.getItem('sidebarExpanded');
    return saved ? JSON.parse(saved) : true;
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  return [isExpanded, setIsExpanded] as const;
}