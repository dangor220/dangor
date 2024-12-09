import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './About.module.scss';
import Articles from '../Articles';
import Popup from '../Popup';

type popupType = {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function About({ popup, setPopup }: popupType): React.ReactNode {
  const [popupData, setPopupData] = useState<string | undefined>('');
  const [t] = useTranslation();
  return (
    <div className={styles.about} id="about" data-anchor>
      {popup && <Popup dataFile={popupData} setPopup={setPopup} />}
      <div className={`${styles.wrapper} container`}>
        <div className={styles.info}>
          <p>{t('firstExperience')}</p>
          <p>{t('education')}</p>
          <p>{t('goals')}</p>
        </div>
        <Articles setPopup={setPopup} setPopupData={setPopupData} />
      </div>
    </div>
  );
}
