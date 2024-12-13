import React, { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './PDFReader.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type PDFReaderTypes = {
  dataFile: string | undefined;
  reader: React.RefObject<HTMLDivElement>;
  handleClosePopup: () => void;
};

export default function PDFReader({ dataFile, reader, handleClosePopup }: PDFReaderTypes) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoad, setIsLoad] = useState<boolean>(false);

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
    <div className={styles.reader} ref={reader}>
      <Document
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
  );
}
