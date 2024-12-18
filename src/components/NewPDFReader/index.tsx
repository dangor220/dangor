import React from 'react';

import { Worker } from '@react-pdf-viewer/core';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from './NewPDFReader.module.scss';

type propsTypes = {
  dataFile: string;
  reader: React.RefObject<HTMLDivElement>;
  handleClosePopup: () => void;
};

// const defaultLayoutPluginInstance =
//   defaultLayoutPlugin();
//   // props?: DefaultLayoutPluginProps

export default function NewPDFReader({
  dataFile,
  reader,
  handleClosePopup,
}: propsTypes): React.ReactNode {
  return (
    <div ref={reader} className={styles.reader}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={dataFile} plugins={[defaultLayoutPlugin()]} />
      </Worker>
    </div>
  );
}
