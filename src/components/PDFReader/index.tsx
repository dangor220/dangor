import React from 'react';

import { Worker } from '@react-pdf-viewer/core';

import { Viewer, CharacterMap, LoadError } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from './PDFReader.module.scss';

type propsTypes = {
  dataFile: string;
  reader: React.RefObject<HTMLDivElement>;
};

const renderError = (error: LoadError) => {
  let message = '';
  switch (error.name) {
    case 'InvalidPDFException':
      message = 'The document is invalid or corrupted';
      break;
    case 'MissingPDFException':
      message = 'The document is missing';
      break;
    case 'UnexpectedResponseException':
      message = 'Unexpected server response';
      break;
    default:
      message = 'Cannot load the document';
      break;
  }

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}>
      <div
        style={{
          backgroundColor: '#e53e3e',
          borderRadius: '0.25rem',
          color: '#fff',
          padding: '0.5rem',
        }}>
        {message}
      </div>
    </div>
  );
};

export default function PDFReader({ dataFile, reader }: propsTypes): React.ReactNode {
  const characterMap: CharacterMap = {
    isCompressed: true,
    url: 'https://unpkg.com/pdfjs-dist@2.6.347/cmaps/',
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div ref={reader} className={styles.reader}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={dataFile}
          characterMap={characterMap}
          plugins={[defaultLayoutPluginInstance]}
          renderError={renderError}
          theme={{
            theme: 'dark',
          }}
        />
      </Worker>
    </div>
  );
}
