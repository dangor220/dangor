import { useCallback, useEffect, useRef, useState } from 'react';

export default function useAnchorHandlers(popup: boolean) {
  const [coords, setCoors] = useState<number[]>([]);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [clickLink, setClickLink] = useState<boolean>(false);
  const hasRun = useRef<boolean>(false);
  const isScrollDisabled = useRef<boolean>(false);
  const mobileScrollY = useRef<number>(0);

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
    if (popup) return;
    if (coords.length > 0) {
      window.scrollTo({
        top: coords[currentBlock],
        behavior: 'smooth',
      });
      sessionStorage.setItem('userView', JSON.stringify(currentBlock));
    }
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
      if (popup) return;

      disableScrollHandling();

      if (event.deltaY > 0) {
        setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
      } else {
        setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
      }
    },
    [coords.length, popup],
  );

  const handleTouchStart = (event: TouchEvent) => {
    mobileScrollY.current = event.touches[0].clientY;
  };

  const handleDebouncedTouchMove = debounce((event) => {
    const currentScroll = event.touches[0].clientY;

    if (mobileScrollY.current - currentScroll > 40) {
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    }

    if (mobileScrollY.current - currentScroll < 40) {
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
  }, 200);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      if (popup) return;
      disableScrollHandling();
      handleDebouncedTouchMove(event);
    },
    [handleDebouncedTouchMove, popup],
  );

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
    }
  }, []);
  const handleKeyUp = debounce((event: KeyboardEvent) => {
    if (popup) return;
    disableScrollHandling();
    if (event.key === 'ArrowDown') {
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    }
    if (event.key === 'ArrowUp') {
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
  }, 200);

  const handleScroll = debounce(() => {
    if (!coords.length || isScrollDisabled.current) return;

    const currentScroll = window.scrollY;

    const closestBlockIndex = coords.reduce((prevIndex, _, currIndex) => {
      return Math.abs(coords[currIndex] - currentScroll) <
        Math.abs(coords[prevIndex] - currentScroll)
        ? currIndex
        : prevIndex;
    }, 0);

    if (clickLink) {
      setCurrentBlock(coords.indexOf(closestBlockIndex));
      setClickLink(false);
    }

    if (currentBlock !== closestBlockIndex) {
      setCurrentBlock(closestBlockIndex);
      sessionStorage.setItem('userView', JSON.stringify(closestBlockIndex));
    }

    sessionStorage.setItem('userView', JSON.stringify(coords.indexOf(closestBlockIndex)));
  }, 300);

  const disableScrollHandling = () => {
    isScrollDisabled.current = true;
    setTimeout(() => {
      isScrollDisabled.current = false;
    }, 500);
  };

  const handleClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('A')) {
      setClickLink(true);
    }
  };

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
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [coords, handleWheel, handleKeyDown, handleKeyUp, handleScroll, handleTouchMove]);
}
