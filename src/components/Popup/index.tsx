import React, { useRef } from 'react';

import styles from './Popup.module.scss';
import PDFReader from '../PDFReader';
import Frame from '../Frame';
import Description from '../Description';

type popupData = {
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
  description?: string;
  dataFile?: string;
  link?: string;
};

export default function Popup({
  dataFile,
  description,
  popup,
  setPopup,
  link,
}: popupData): React.ReactNode {
  const content = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (content.current && !content.current.contains(event.target as Node)) {
      setPopup('hidden');
    }
  };

  return (
    <div className={styles.popup} onClick={handleClickOutside}>
      {popup === 'pdfReader' && dataFile && <PDFReader dataFile={dataFile} reader={content} />}
      {popup === 'project' && <Frame projectLink={link} frameRef={content} />}
      {popup === 'description' && description && (
        <Description descriptionRef={content} description={description} />
      )}
    </div>
  );
}
