import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './About.module.scss';
import Articles from './Articles';

export default function About(): React.ReactNode {
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
          <Articles />
        </ul>
      </div>
    </div>
  );
}
