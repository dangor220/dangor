import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCustomScroll(popup: string, isFormFocus: boolean) {
  const [coords, setCoords] = useState<number[]>([]);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [isAnim, setIsAnim] = useState<boolean>(false);
  const hasRun = useRef<boolean>(false);
  const mobileScrollY = useRef<number>(0);

  const getCoords = useCallback(() => {
    return coords[currentBlock];
  }, [coords, currentBlock]);

  useEffect(() => {
    const handleLoad = () => {
      const anchorData = [...document.querySelectorAll('[data-anchor]')];
      const anchorCoords = anchorData.map(
        (elem) => (elem as HTMLElement).getBoundingClientRect().top + window.scrollY,
      );
      setCoords(anchorCoords);

      if (!hasRun.current) {
        const storedView = sessionStorage.getItem('userView');
        setCurrentBlock(storedView ? Number(storedView) : 0);

        setTimeout(() => {
          window.scrollTo({
            top: anchorCoords[Number(sessionStorage.getItem('userView'))],
            behavior: 'smooth',
          });
        }, 0);

        hasRun.current = true;
      }
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isAnim) {
      const start = window.scrollY;
      const end = getCoords();
      const duration = 0;
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
      if (popup !== 'hidden' || isAnim) return;
      if (event.ctrlKey) return;
      event.preventDefault();
      handleDebounceWheel(event);
    },
    [handleDebounceWheel, popup, isAnim],
  );

  const handleTouchStart = (event: TouchEvent) => {
    mobileScrollY.current = event.touches[0].clientY;
  };

  const handleDebouncedTouchMove = debounce((event: TouchEvent) => {
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
      const target = event.target;
      if (target instanceof Element && target.closest('header')) {
        event.preventDefault();
        return;
      }
      if (popup !== 'hidden' || isAnim) return;
      event.preventDefault();
      handleDebouncedTouchMove(event);
    },
    [handleDebouncedTouchMove, popup, isAnim],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        isFormFocus &&
        (event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp')
      )
        return;
      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'PageUp' ||
        event.key === 'PageDown' ||
        event.key === ' '
      ) {
        if (popup !== 'hidden' || isAnim) return;
        event.preventDefault();
      }
    },
    [popup, isAnim, isFormFocus],
  );

  const handleDebouncedKeyUp = debounce((event: KeyboardEvent) => {
    if (isFormFocus && (event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp'))
      return;
    if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === coords.length - 1 ? prev : prev + 1));
    }
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      setIsAnim(true);
      setCurrentBlock((prev) => (prev === 0 ? prev : prev - 1));
    }
  }, 300);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (popup !== 'hidden' || isAnim) return;
      handleDebouncedKeyUp(event);
    },
    [handleDebouncedKeyUp, popup, isAnim],
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

  const handleResize = useCallback(() => {
    setTimeout(() => {
      const anchorData = [...document.querySelectorAll('[data-anchor]')];
      const anchorCoords = anchorData.map(
        (elem) => (elem as HTMLElement).getBoundingClientRect().top + window.scrollY,
      );
      setCoords(anchorCoords);

      requestAnimationFrame(() => {
        window.scrollTo({
          top: anchorCoords[currentBlock] || 0,
          behavior: 'instant',
        });
      });
    }, 100);
  }, [currentBlock]);

  const handleOrientation = () => {
    location.reload();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, [handleResize]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [coords, handleWheel, handleKeyDown, handleKeyUp, handleScroll, handleTouchMove]);
}
