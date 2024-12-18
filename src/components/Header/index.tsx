import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import LanguageDetector from 'i18next-browser-languagedetector';

import Logo from '../Logo';
import Hamburger from '../Hamburger';

import styles from './Header.module.scss';
import useActiveSection from '../../hooks/useActiveSection';
import handleLinkClick from '../../utils/clickToLinkBehavior';

interface HeaderProps {
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ menuIsOpen, setMenuIsOpen }, ref) => {
  const navList: string[] = ['home', 'about', 'skills', 'projects', 'contact'];
  const [t, i18n] = useTranslation();
  const [activeLang, setActiveLang] = useState<string | undefined>('en');
  const [headerIsFixed, setHeaderIsFixed] = useState<boolean>(false);

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
    setMenuIsOpen((prev) => !prev);
  };

  const handleNavItemClick = () => {
    setMenuIsOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${headerIsFixed && activeItem !== 2 ? styles.fixed : ''}`}
      ref={ref as React.Ref<HTMLDivElement>}>
      <div className={`${styles.wrapper} ${activeItem === 3 ? styles.isProject : 'container'}`}>
        <Logo headerIsFixed={headerIsFixed} activeItem={activeItem} />
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
              />
            </button>
          </nav>
          <div className={`${styles.lang} ${menuIsOpen ? styles.langHidden : ''}`}>
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
});

export default Header;
