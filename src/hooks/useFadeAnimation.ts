import { useEffect } from 'react';

export default function useFadeAnimation() {
  useEffect(() => {
    const ANIMATION_CLASS = 'pageFadeAnimation';
    const ANIMATION_DURATION = 2000;

    document.body.classList.add(ANIMATION_CLASS);

    const timeoutId = setTimeout(() => {
      document.body.classList.remove(ANIMATION_CLASS);
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
}
