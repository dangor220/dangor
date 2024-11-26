import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import LanguageDetector from 'i18next-browser-languagedetector';

import styles from './Header.module.scss';
import Logo from '../Logo';
import Hamburger from '../Hamburger';

export default function Header(): React.ReactNode {
  const navList: string[] = ['home', 'about', 'skills', 'projects', 'contact'];
  const [t, i18n] = useTranslation();
  const [activeItem, setActiveItem] = useState<number>(0);
  const [activeLang, setActiveLang] = useState<string | undefined>('');
  const [headerIsFixed, setHeaderIsFixed] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    setHeaderIsFixed(scrollTop > 90);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const currentLang = i18n.use(LanguageDetector).resolvedLanguage;
    setActiveLang(currentLang);
  }, [i18n]);

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const handleSelectLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectLang = (e.target as HTMLButtonElement).textContent;
    if (selectLang) {
      switchLanguage(selectLang);
      setActiveLang(selectLang);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={`${styles.header} ${headerIsFixed ? styles.fixed : ''}`}>
      <div className={`${styles.wrapper} container`}>
        <div className={styles.logo}>
          <a href="#">
            <Logo />
          </a>
        </div>
        <div className={styles.menu}>
          <nav className={styles.nav}>
            <button className={styles.burger} onClick={toggleMenu}>
              <Hamburger headerIsFixed={headerIsFixed} />
            </button>
            <ul className={`${styles.list} ${isMenuOpen ? styles.menuOpen : ''}`}>
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
            <button
              className={`${styles.langBtn} ${activeLang === 'en' ? styles.active : ''}`}
              onClick={(e) => handleSelectLanguage(e)}>
              en
            </button>
            <span className={styles.separator}>|</span>
            <button
              className={`${styles.langBtn} ${activeLang === 'ru' ? styles.active : ''}`}
              onClick={(e) => handleSelectLanguage(e)}>
              ru
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
