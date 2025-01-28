import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './About.module.scss';
import Articles from '../Articles';
import Popup from '../Popup';
import DescriptionAdaptive from '../DescriptionAdaptive';

type popupType = {
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
  popupData: string | undefined;
  setPopupData: React.Dispatch<React.SetStateAction<string | undefined>>;
  clientWidth: number;
  clientHeight: number;
};

export default function About({
  popup,
  setPopup,
  popupData,
  setPopupData,
  clientWidth,
  clientHeight,
}: popupType): React.ReactNode {
  const [t] = useTranslation();
  const data = ['firstExperience', 'education', 'goals'];
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.about} id="about" data-anchor>
      {popup === 'pdfReader' && <Popup dataFile={popupData} popup={popup} setPopup={setPopup} />}
      <div className={`${styles.wrapper} container`}>
        <div className={styles.info}>
          {data.map((info, index) => (
            <div
              ref={contentRef}
              key={index}
              {...(clientHeight <= 884 && clientWidth <= 768 ? { 'data-anchor': true } : {})}>
              <DescriptionAdaptive
                text={t(info)}
                content={contentRef}
                clientWidth={clientWidth}
                clientHeight={clientHeight}
                setPopup={setPopup}
                setPopupData={setPopupData}
              />
            </div>
          ))}
        </div>
        <Articles
          popup={popup}
          popupData={popupData}
          setPopup={setPopup}
          setPopupData={setPopupData}
          clientWidth={clientWidth}
          clientHeight={clientHeight}
        />
      </div>
    </div>
  );
}
