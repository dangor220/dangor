import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import styles from './Header.module.scss';
import Logo from '../Logo';

export default function Header(): React.ReactNode {
  const navList: string[] = ['home', 'about', 'skills', 'projects', 'contact'];
  const [t, i18n] = useTranslation();
  const [activeItem, setActiveItem] = useState(0);

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.logo}>
        <a href="#">
          <Logo />
        </a>
      </div>
      <div className={styles.menu}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {navList.map((item, index) => (
              <li
                className={`${styles.item} ${activeItem === index ? styles.active : ''}`}
                key={uuidv4()}
                onClick={() => setActiveItem(index)}>
                <a className={styles.link} href="#">
                  {t(item)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.lang}>
          <button className={styles.langBtn} onClick={() => switchLanguage('en')}>
            en
          </button>
          <span className={styles.separator}>|</span>
          <button className={styles.langBtn} onClick={() => switchLanguage('ru')}>
            ru
          </button>
        </div>
      </div>
    </header>
  );
}
