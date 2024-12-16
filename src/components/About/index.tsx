import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './About.module.scss';
import Articles from '../Articles';
import Popup from '../Popup';

type popupType = {
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
  clientWidth: number;
  clientHeight: number;
};

export default function About({
  popup,
  setPopup,
  clientWidth,
  clientHeight,
}: popupType): React.ReactNode {
  const [popupData, setPopupData] = useState<string | undefined>('');
  const [t] = useTranslation();

  return (
    <div className={styles.about} id="about" data-anchor>
      {popup === 'pdfReader' && <Popup dataFile={popupData} popup={popup} setPopup={setPopup} />}
      <div className={`${styles.wrapper} container`}>
        <div className={styles.info}>
          <p>{t('firstExperience')}</p>
          <p {...(clientHeight <= 884 && clientWidth <= 768 ? { 'data-anchor': true } : {})}>
            {t('education')}
          </p>
          <p {...(clientHeight <= 884 && clientWidth <= 768 ? { 'data-anchor': true } : {})}>
            {t('goals')}
          </p>
        </div>
        <Articles
          setPopup={setPopup}
          setPopupData={setPopupData}
          clientWidth={clientWidth}
          clientHeight={clientHeight}
        />
      </div>
    </div>
  );
}
