import React, { useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import styles from './Popup.module.scss';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type popupData = {
  dataFile: string | undefined;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Popup({ dataFile, setPopup }: popupData): React.ReactNode {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const reader = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoad(true);
  };
  const changePage = (offset: number) => {
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
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
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

  const LoadingPDF = (): React.ReactNode => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress
          sx={(theme) => ({
            color: theme.palette.grey[200],
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[800],
            }),
          })}
        />
      </Box>
    );
  };

  return (
    <div className={styles.popup} onClick={handleClickOutside}>
      <div className={styles.reader} ref={reader}>
        <Document
          className={styles.document}
          loading={<LoadingPDF />}
          noData={<LoadingPDF />}
          file={dataFile}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            className={styles.page}
            pageNumber={pageNumber}
            loading={<LoadingPDF />}
            width={reader.current?.getBoundingClientRect().width || undefined}
          />
        </Document>
        <div className={isLoad ? styles.menu : styles.disabled}>
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
        <div className={isLoad ? styles.close : styles.disabled} onClick={handleClosePopup}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
