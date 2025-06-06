import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import LanguageDetector from 'i18next-browser-languagedetector';

import Logo from '../Logo';
import Hamburger from '../Hamburger';

import styles from './Header.module.scss';
import useActiveSection from '../../hooks/useActiveSection';
import handleLinkClick from '../../utils/clickToLinkBehavior';
import Theme from '../Theme';

interface HeaderProps {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ menuIsOpen, setMenuIsOpen }, ref) => {
  const navList: string[] = ['home', 'about', 'skills', 'projects', 'contacts'];
  const [t, i18n] = useTranslation();
  const [activeLang, setActiveLang] = useState<string | undefined>();
  const [headerIsFixed, setHeaderIsFixed] = useState<boolean>(false);
  const transparentSections = [2, 4];

  const menuRef = useRef<HTMLUListElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const activeItem = useActiveSection(navList);

  const handleClickMenuOutside = useCallback(
    (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        setMenuIsOpen(false);
      }
    },
    [setMenuIsOpen],
  );

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    setHeaderIsFixed(scrollTop > 90);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {}, 200);
    handleScroll();
    document.addEventListener('mousedown', handleClickMenuOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickMenuOutside);
      clearTimeout(timer);
    };
  }, [handleClickMenuOutside, handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const currentLang = i18n.use(LanguageDetector).resolvedLanguage;
    const pageLang = document.documentElement.lang;

    if (pageLang && currentLang) {
      document.documentElement.lang = currentLang;
    }
    setActiveLang(currentLang);
  }, [i18n]);

  useEffect(() => {
    i18n.changeLanguage(activeLang);
    if (activeLang) {
      document.documentElement.lang = activeLang;
      document.title =
        activeLang === 'ru'
          ? 'Данил Гордеев | dangor – Фронтенд-разработчик | React, TypeScript'
          : 'Danil Gordeev | dangor – Frontend Developer | React, TypeScript';
    }
  }, [i18n, activeLang]);

  const handleSelectLanguage = () => {
    setActiveLang((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const handleNavItemClick = () => {
    setMenuIsOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${
        headerIsFixed && activeItem && !transparentSections.includes(activeItem) ? styles.fixed : ''
      } loadAnimation shortTimeAnimation delayAnimation`}
      ref={ref as React.Ref<HTMLDivElement>}>
      <div className={`${styles.wrapper} ${activeItem === 3 ? styles.isProject : 'container'}`}>
        <Logo
          transparentSections={transparentSections}
          headerIsFixed={headerIsFixed}
          activeItem={activeItem}
        />
        <div className={styles.menu}>
          <nav className={styles.nav}>
            <ul className={`${styles.list} ${menuIsOpen ? styles.menuOpen : ''}`} ref={menuRef}>
              {navList.map((item, index) => (
                <li
                  className={`${styles.item} ${activeItem === index ? styles.active : ''}`}
                  key={uuidv4()}
                  onClick={() => handleNavItemClick()}>
                  <a className={styles.link} href={`#${item}`} onClick={handleLinkClick}>
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
            <button className={styles.burger} onClick={toggleMenu} ref={burgerRef}>
              <Hamburger
                headerIsFixed={headerIsFixed}
                menuIsOpen={menuIsOpen}
                activeItem={activeItem}
                transparentSections={transparentSections}
              />
            </button>
          </nav>
          <Theme headerIsFixed={headerIsFixed} />
          <button
            className={`${styles.langBtn} ${menuIsOpen ? styles.langHidden : ''}`}
            onClick={handleSelectLanguage}>
            <span
              className={`${styles.lang} ${activeLang === 'en' ? styles.active : ''}`}
              data-lang="en">
              en
            </span>
            <span className={styles.separator}>|</span>
            <span
              className={`${styles.lang} ${activeLang === 'ru' ? styles.active : ''}`}
              data-lang="ru">
              ru
            </span>
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
