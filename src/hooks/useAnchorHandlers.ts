import { useEffect, useRef, useState } from 'react';

// TODO handler for mobile

export default function useAnchorHandlers(popup) {
  const [anchorCoords, setAnchorCoords] = useState<number[]>([]);
  const [anchorActive, setAnchorActive] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(0);

  const mobileStartY = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);
  const [isInitialScroll, setIsInitialScroll] = useState(true);

  useEffect(() => {
    const anchorData = [...document.querySelectorAll('[data-anchor]')];
    const anchorCoordsRelativeScroll = anchorData.map(
      (item) => item.getBoundingClientRect().top + window.scrollY,
    );
    setAnchorCoords(anchorCoordsRelativeScroll);

    const closest = anchorCoordsRelativeScroll.reduce((prev, curr) => {
      const scroll = window.scrollY;
      return Math.abs(curr - scroll) < Math.abs(prev - scroll) ? curr : prev;
    });

    setCurrentBlock(anchorCoordsRelativeScroll.indexOf(closest));
  }, []);

  useEffect(() => {
    if (isInitialScroll && anchorCoords.length) {
      window.scrollTo({
        top: anchorCoords[currentBlock],
        behavior: 'smooth',
      });

      setTimeout(() => setIsInitialScroll(false), 300);
    }
  }, [anchorCoords, currentBlock, isInitialScroll]);

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [popup]);

  useEffect(() => {
    if (popup) return;
    const handleMoveDown = () => {
      setAnchorActive(true);
      window.scrollTo({
        top: anchorCoords[currentBlock + 1],
        behavior: 'smooth',
      });
      setCurrentBlock((prev) => prev + 1);

      setTimeout(() => setAnchorActive(false), 300);
    };

    const handleMoveUp = () => {
      setAnchorActive(true);
      window.scrollTo({
        top: anchorCoords[currentBlock - 1],
        behavior: 'smooth',
      });
      setCurrentBlock((prev) => prev - 1);
      setTimeout(() => setAnchorActive(false), 300);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (anchorActive) return;
      if (event.key === 'ArrowDown' && currentBlock + 1 < anchorCoords.length) {
        handleMoveDown();
      }
      if (event.key === 'ArrowUp' && currentBlock - 1 >= 0) {
        handleMoveUp();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (anchorActive) return;

      if (event.deltaY > 0 && currentBlock + 1 < anchorCoords.length) {
        handleMoveDown();
      }
      if (event.deltaY < 0 && currentBlock - 1 >= 0) {
        handleMoveUp();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      mobileStartY.current = event.touches[0].clientY;
    };
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      if (anchorActive) return;

      const currentY = event.touches[0].clientY;
      const delta = mobileStartY.current - currentY;

      if (delta > 0 && currentBlock + 1 < anchorCoords.length) {
        handleMoveDown();
      }
      if (delta < 0 && currentBlock - 1 >= 0) {
        handleMoveUp();
      }
      mobileStartY.current = currentY;
    };

    const handleScroll = () => {
      if (isInitialScroll) return;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (anchorCoords.length) {
          const closest = anchorCoords.reduce((prev, curr) => {
            const scroll = window.scrollY;
            return Math.abs(curr - scroll) < Math.abs(prev - scroll) ? curr : prev;
          });
          setCurrentBlock(anchorCoords.indexOf(closest));
        }
      }, 150);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentBlock, anchorCoords, anchorActive, isInitialScroll, popup]);
}
