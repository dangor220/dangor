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
import useFadeAnimation from './hooks/useFadeAnimation';
import useHandleScrollbar from './hooks/useHandleScrollbar';

export default function App(): React.ReactNode {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<string>('hidden');
  const [popupData, setPopupData] = useState<string | undefined>('');
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [clientHeight, setClientHeight] = useState(window.innerHeight);

  const headerRef = useRef<HTMLDivElement | null>(null);

  useHandleScrollbar(headerRef, popup);
  useAnchorHandlers(popup);
  useFadeAnimation();

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

  return (
    <>
      <Header ref={headerRef} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Preview menuIsOpen={menuIsOpen} />
      <About
        popup={popup}
        setPopup={setPopup}
        popupData={popupData}
        setPopupData={setPopupData}
        clientWidth={clientWidth}
        clientHeight={clientHeight}
      />
      <Skills />
      <Projects popup={popup} setPopup={setPopup} />
      <Background />
    </>
  );
}
