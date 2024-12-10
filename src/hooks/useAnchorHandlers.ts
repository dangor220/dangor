import { useCallback, useEffect, useRef, useState } from 'react';

export default function useAnchorHandlers(popup: boolean) {
  const [coords, setCoors] = useState<number[]>([]);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [clickLink, setClickLink] = useState<boolean>(false);
  const hasRun = useRef<boolean>(false);
  const mobileScrollY = useRef<number>(0);
  const mobileScrollYDiff = useRef<number>(0);

  useEffect(() => {
    const anchorData = [...document.querySelectorAll('[data-anchor]')];
    const anchorCoords = anchorData.map(
      (elem) => (elem as HTMLElement).getBoundingClientRect().top + window.scrollY,
    );
    setCoors(anchorCoords);

    if (!hasRun.current) {
      setCurrentBlock(Number(localStorage.getItem('userView')));
      hasRun.current = true;
    }
  }, []);

  useEffect(() => {
    if (popup) return;
    window.scrollTo({
      top: coords[currentBlock],
      behavior: 'auto',
    });
    localStorage.setItem('userView', JSON.stringify(currentBlock));
  }, [coords, currentBlock, popup]);

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();

      if (event.deltaY > 0) {
        setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
      } else {
        setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
      }
    },
    [coords.length],
  );

  const handleTouchStart = (event: TouchEvent) => {
    mobileScrollY.current = event.touches[0].clientY;
  };

  const handleTouchMove = useCallback((event: TouchEvent) => {
    event.preventDefault();
    const currentScroll = event.touches[0].clientY;
    mobileScrollYDiff.current = mobileScrollY.current - currentScroll;
    mobileScrollY.current = currentScroll;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (mobileScrollYDiff.current < 0) {
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
    if (mobileScrollYDiff.current > 0) {
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    }
  }, [coords.length]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
  }, []);
  const handleKeyUp = debounce((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    }
    if (event.key === 'ArrowUp') {
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
  }, 200);

  const handleScroll = debounce(() => {
    if (!coords.length) return;

    const closest = coords.reduce((prev, curr) => {
      const currentScroll = window.scrollY;
      return Math.abs(curr - currentScroll) < Math.abs(prev - currentScroll) ? curr : prev;
    });

    if (clickLink) {
      setCurrentBlock(coords.indexOf(closest));
      setClickLink(false);
    }

    localStorage.setItem('userView', JSON.stringify(coords.indexOf(closest)));
  }, 300);

  const handleClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('A')) {
      setClickLink(true);
    }
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleClick);
    };
  }, [
    coords,
    handleWheel,
    handleKeyDown,
    handleKeyUp,
    handleScroll,
    handleTouchMove,
    handleTouchEnd,
  ]);
}
