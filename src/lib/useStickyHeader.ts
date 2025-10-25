import { useEffect, useRef, useState } from 'react';

/**
 * useStickyHeader - Adds/removes 'stick' class to the ref element on scroll past threshold.
 * SSR-safe, lightweight, returns { ref, isSticky }.
 * @param threshold - px scroll before sticky triggers (default 10)
 */
export function useStickyHeader<T extends HTMLElement = HTMLElement>(threshold = 10) {
	const ref = useRef<T | null>(null);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const handleScroll = () => {
			const shouldStick = window.scrollY > threshold;
			setIsSticky(shouldStick);
			if (ref.current) {
				ref.current.classList.toggle('stick', shouldStick);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		// Run once on mount
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, [threshold]);

	return { ref, isSticky };
}
