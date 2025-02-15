import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Preview.module.scss';
import author from '../../assets/images/author/author.jpg';
import handleLinkClick from '../../utils/clickToLinkBehavior';

export default function Preview({ menuIsOpen }: { menuIsOpen: boolean }): React.ReactNode {
  const [t] = useTranslation();
  const subtitleText: string[] = [t('whoIAm'), t('goal'), t('suggest')];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % subtitleText.length);
        setIsVisible(true);
      }, 2000);
    }, 6000);

    return () => clearInterval(interval);
  }, [subtitleText.length]);

  return (
    <div className={styles.preview} id="home" data-anchor>
      <div className={`${styles.author} loadAnimation shortTimeAnimation delayAnimation`}>
        <img
          className={`${styles.image} ${menuIsOpen ? styles.imageHidden : ''}`}
          src={author}
          alt="Danil Gordeev"
        />
      </div>

      <div className={`${styles.info} loadAnimation shortTimeAnimation delayAnimation`}>
        <div className={`${styles.title} ${menuIsOpen ? styles.titleHidden : ''}`}>{t('name')}</div>
        <div
          className={`${styles.subtitle} ${menuIsOpen ? styles.titleHidden : ''} ${
            isVisible ? styles.visible : ''
          }`}>
          {subtitleText[currentIndex]}
        </div>
      </div>

      <div className={styles.arrow}>
        <a
          className={`loadAnimation shortTimeAnimation delayAnimation`}
          href="#about"
          onClick={handleLinkClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 330 330">
            <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
