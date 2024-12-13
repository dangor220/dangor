import './i18n/i18n';
import React, { useEffect, useState } from 'react';
import useAnchorHandlers from './hooks/useAnchorHandlers';

import Background from './components/Background';
import Header from './components/Header';
import Preview from './components/Preview';
import About from './components/About';

import 'normalize.css';
import './scss/app.scss';
import Skills from './components/Skills';

export default function App(): React.ReactNode {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [clientHeight, setClientHeight] = useState(window.innerHeight);

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

  return (
    <>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Preview menuIsOpen={menuIsOpen} />
      <About
        popup={popup}
        setPopup={setPopup}
        clientWidth={clientWidth}
        clientHeight={clientHeight}
      />
      <Skills />
      <Background />
    </>
  );
}
