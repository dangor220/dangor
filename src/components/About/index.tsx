import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './About.module.scss';

export default function About(): React.ReactNode {
  const articles: string[] = [];
  const [t] = useTranslation();
  return (
    <div className={styles.about} id="about" data-anchor="about">
      <div className={`${styles.wrapper} container`}>
        <div className={styles.info}>
          <p>{t('firstExperience')}</p>
          <p>{t('education')}</p>
          <p>{t('goals')}</p>
        </div>
        <ul className={styles.articles}>
          <li className={styles.article}>
            <a href="" className={styles.link}>
              text 1
            </a>
          </li>
          <li className={styles.article} data-anchor="article2">
            <a href="" className="link">
              work 1
            </a>
          </li>
          <li className={styles.article} data-anchor="article3">
            <a href="" className="link">
              text2
            </a>
          </li>
          <li className={styles.article} data-anchor="article4">
            <a href="" className="link">
              porro!
            </a>
          </li>
          <li className={styles.article} data-anchor="article5">
            <a href="" className="link">
              Lorem
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
