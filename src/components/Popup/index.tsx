import React, { useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import styles from './Popup.module.scss';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/Close';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Popup({ dataFile, setPopup }): React.ReactNode {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const reader = useRef();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };
  const previousPage = () => {
    changePage(-1);
  };
  const nextPage = () => {
    changePage(1);
  };
  const handleClosePopup = () => {
    setPopup(false);
  };
  const handleClickOutside = (event) => {
    if (reader.current && !reader.current.contains(event.target as Node)) {
      setPopup(false);
    }
  };

  const options = useMemo(
    () => ({
      cMapUrl: '/cmaps/',
    }),
    [],
  );

  return (
    <div className={styles.popup} onClick={handleClickOutside}>
      <div className={styles.reader} ref={reader}>
        <Document file={dataFile} options={options} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div className={styles.menu}>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            <UndoIcon />
          </button>
          <p>
            {pageNumber || (numPages ? 1 : '--')} / {numPages || '--'}
          </p>
          <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
            <RedoIcon />
          </button>
        </div>{' '}
        <div className={styles.close} onClick={handleClosePopup}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
