import React, { useEffect, useRef, useState } from 'react';

import styles from './Theme.module.scss';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function Theme({ headerIsFixed }: { headerIsFixed: boolean }): React.ReactNode {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const container = useRef<HTMLButtonElement>(null);
  const icons = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === 'dark' && container && icons && container.current && icons.current) {
      container.current.classList.add(styles.dark);
      icons.current.style.setProperty('--rotation', String(180));
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));

    if (container && icons && container.current && icons.current) {
      const rotation = parseInt(getComputedStyle(icons.current).getPropertyValue('--rotation'));
      container.current.classList.toggle(styles.dark);
      icons.current.style.setProperty('--rotation', String(rotation - 180));
    }
  };

  const themeIcon = () => {
    return (
      <button
        onClick={toggleTheme}
        ref={container}
        className={`${styles.container} ${styles.containerHidden}`}>
        <div className={`${styles['swap-btn']} ${styles['container-icons-outer']}`}>
          <div className={styles['icon-container']}>
            <div ref={icons} className={styles.icons}>
              <div className={`${styles.icon} ${styles.icon1}`}>
                <i className="fas fa-moon">
                  <Brightness4Icon />
                </i>
              </div>
              <div
                className={`${styles.icon} ${styles.icon2} ${headerIsFixed ? styles.fixed : ''}`}>
                <i className="fas fa-sun">
                  <Brightness7Icon />
                </i>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  };
  return themeIcon();
}
