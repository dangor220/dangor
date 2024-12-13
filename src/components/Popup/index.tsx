import React, { useRef } from 'react';

import styles from './Popup.module.scss';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PDFReader from '../PDFReader';

type popupData = {
  dataFile: string | undefined;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Popup({ dataFile, setPopup }: popupData): React.ReactNode {
  const reader = useRef<HTMLDivElement>(null);

  const handleClosePopup = () => {
    setPopup(false);
  };
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reader.current && !reader.current.contains(event.target as Node)) {
      setPopup(false);
    }
  };

  return (
    <div className={styles.popup} onClick={handleClickOutside}>
      <PDFReader dataFile={dataFile} reader={reader} handleClosePopup={handleClosePopup} />
    </div>
  );
}
