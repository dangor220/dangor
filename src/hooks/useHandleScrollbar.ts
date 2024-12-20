import { useEffect } from 'react';

export default function useHandleScrollbar(
  headerRef: React.MutableRefObject<HTMLDivElement | null>,
  popup: string,
) {
  useEffect(() => {
    const hasScrollbar = () => {
      return document.body.scrollHeight > window.innerHeight;
    };

    if (!headerRef.current || !hasScrollbar()) {
      document.body.style.cssText = '';
      return;
    }

    if (popup !== 'hidden') {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const headerWidth = headerRef.current.getBoundingClientRect().width - scrollbarWidth;
      headerRef.current.style.width = `${headerWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      headerRef.current.style.width = `100%`;
    }
  }, [popup, headerRef]);
}
