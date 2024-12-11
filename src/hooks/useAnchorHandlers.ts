import { useCallback, useEffect, useRef, useState } from 'react';

export default function useAnchorHandlers(popup: boolean) {
  const [coords, setCoors] = useState<number[]>([]);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [isAnim, setIsAnim] = useState<boolean>(false);
  const hasRun = useRef<boolean>(false);
  const mobileScrollY = useRef<number>(0);

  const getCoords = useCallback(() => {
    return coords[currentBlock];
  }, [coords, currentBlock]);

  useEffect(() => {
    const anchorData = [...document.querySelectorAll('[data-anchor]')];
    const anchorCoords = anchorData.map(
      (elem) => (elem as HTMLElement).getBoundingClientRect().top + window.scrollY,
    );
    setCoors(anchorCoords);

    if (!hasRun.current) {
      setCurrentBlock(Number(sessionStorage.getItem('userView')));
      window.scrollTo({
        top: anchorCoords[Number(sessionStorage.getItem('userView'))],
        behavior: 'smooth',
      });
      hasRun.current = true;
    }
  }, []);

  useEffect(() => {
    if (isAnim) {
      const start = window.scrollY;
      const end = getCoords();
      const duration = 150;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const scrollTo = start + (end - start) * progress;

        window.scrollTo(0, scrollTo);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsAnim(false);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, [isAnim, getCoords]);

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleDebounceWheel = debounce((event: WheelEvent) => {
    if (popup || isAnim) return;

    if (event.deltaY > 0) {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    } else {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
  }, 300);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      handleDebounceWheel(event);
    },
    [handleDebounceWheel],
  );

  const handleTouchStart = (event: TouchEvent) => {
    mobileScrollY.current = event.touches[0].clientY;
  };

  const handleDebouncedTouchMove = debounce((event: TouchEvent) => {
    if (popup || isAnim) return;
    const currentScroll = event.touches[0].clientY;

    if (mobileScrollY.current - currentScroll > 40) {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    }

    if (mobileScrollY.current - currentScroll < 40) {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
  }, 300);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      handleDebouncedTouchMove(event);
    },
    [handleDebouncedTouchMove],
  );

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
  }, []);

  const handleDebouncedKeyUp = debounce((event: KeyboardEvent) => {
    if (popup || isAnim) return;

    if (event.key === 'ArrowDown') {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    }
    if (event.key === 'ArrowUp') {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
  }, 300);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      handleDebouncedKeyUp(event);
    },
    [handleDebouncedKeyUp],
  );

  const handleDebouncedScroll = debounce(() => {
    if (!coords.length) return;

    const closest = coords.reduce((prev, curr) => {
      const currentScroll = window.scrollY;
      return Math.abs(curr - currentScroll) < Math.abs(prev - currentScroll) ? curr : prev;
    });
    if (!isAnim) {
      setCurrentBlock(coords.indexOf(closest));
      sessionStorage.setItem('userView', JSON.stringify(coords.indexOf(closest)));
    }
  }, 300);

  const handleScroll = useCallback(() => {
    handleDebouncedScroll();
  }, [handleDebouncedScroll]);

  const handleResize = () => {
    const anchorData = [...document.querySelectorAll('[data-anchor]')];
    const anchorCoords = anchorData.map(
      (elem) => (elem as HTMLElement).getBoundingClientRect().top + window.scrollY,
    );
    setCoors(anchorCoords);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [coords, handleWheel, handleKeyDown, handleKeyUp, handleScroll, handleTouchMove]);
}
