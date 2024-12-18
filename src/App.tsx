import './i18n/i18n';
import React, { useEffect, useRef, useState } from 'react';
import useAnchorHandlers from './hooks/useAnchorHandlers';

import Background from './components/Background';
import Header from './components/Header';
import Preview from './components/Preview';
import About from './components/About';

import 'normalize.css';
import './scss/app.scss';
import Skills from './components/Skills';
import Projects from './components/Projects';

export default function App(): React.ReactNode {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<string>('hidden');
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [clientHeight, setClientHeight] = useState(window.innerHeight);

  const headerRef = useRef<HTMLDivElement | null>(null);

  useAnchorHandlers(popup);

  const handleResize = () => {
    setClientWidth(window.innerWidth);
    setClientHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  }, [popup]);

  return (
    <>
      <Header ref={headerRef} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Preview menuIsOpen={menuIsOpen} />
      <About
        popup={popup}
        setPopup={setPopup}
        clientWidth={clientWidth}
        clientHeight={clientHeight}
      />
      <Skills />
      <Projects popup={popup} setPopup={setPopup} />
      <Background />
    </>
  );
}
