import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './About.module.scss';
import Articles from '../Articles';
import Popup from '../Popup';

export default function About(): React.ReactNode {
  const [popup, setPopup] = useState(false);
  const [t] = useTranslation();
  return (
    <div className={styles.about} id="about" data-anchor="about">
      {popup && <Popup />}
      <div className={`${styles.wrapper} container`}>
        <div className={styles.info}>
          <p>{t('firstExperience')}</p>
          <p>{t('education')}</p>
          <p>{t('goals')}</p>
        </div>
        <Articles setPopup={setPopup} />
      </div>
    </div>
  );
}
