import React, { useRef } from 'react';

import styles from './Popup.module.scss';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// import PDFReader from '../PDFReader';
import NewPDFReader from '../NewPDFReader';

type popupData = {
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
  dataFile?: string;
  link?: string;
};

export default function Popup({ dataFile, popup, setPopup, link }: popupData): React.ReactNode {
  const content = useRef<HTMLDivElement>(null);

  const handleClosePopup = () => {
    setPopup('hidden');
  };
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (content.current && !content.current.contains(event.target as Node)) {
      setPopup('hidden');
    }
  };

  return (
    <div className={styles.popup} onClick={handleClickOutside}>
      {popup === 'pdfReader' && (
        // <PDFReader dataFile={dataFile} reader={content} handleClosePopup={handleClosePopup} />
        // <>123</>
        <NewPDFReader dataFile={dataFile} reader={content} handleClosePopup={handleClosePopup} />
      )}
      {popup === 'project' && (
        <div ref={content}>
          <iframe className={styles.iframe} src={link}></iframe>
        </div>
      )}
    </div>
  );
}
