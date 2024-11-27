import './i18n/i18n';
import React, { useState } from 'react';

import Background from './components/Background';
import Header from './components/Header';
import Preview from './components/Preview';

import 'normalize.css';
import './scss/app.scss';

export default function App(): React.ReactNode {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Preview menuIsOpen={menuIsOpen} />
      <Background />
    </>
  );
}
