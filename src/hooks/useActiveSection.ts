import { useCallback, useEffect, useState } from 'react';

export default function useActiveSection(navList: string[]): number | undefined {
  const [activeSection, setActiveSection] = useState<number | undefined>(undefined);

  const handleScrollToSection = useCallback(() => {
    const sections = navList.map((id) => document.getElementById(id));

    const currentIndex = sections.findIndex((section) => {
      if (!section) return false;

      const { top, bottom } = section.getBoundingClientRect();
      return top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2;
    });

    if (currentIndex !== -1 && currentIndex !== activeSection) {
      setActiveSection(currentIndex);
    }
  }, [navList, activeSection]);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollToSection);
    handleScrollToSection();
    return () => {
      document.removeEventListener('scroll', handleScrollToSection);
    };
  }, [handleScrollToSection]);

  return activeSection;
}
