import React from 'react';

import { Worker } from '@react-pdf-viewer/core';

import { LocalizationMap, Viewer, CharacterMap, LoadError } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import type { ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from './PDFReader.module.scss';
import ru_RU from '@react-pdf-viewer/locales/lib/ru_RU.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation } from 'react-i18next';

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
  const [, i18n] = useTranslation();
  const currentLang = i18n.use(LanguageDetector).resolvedLanguage;

  const characterMap: CharacterMap = {
    isCompressed: true,
    url: 'https://unpkg.com/pdfjs-dist@2.6.347/cmaps/',
  };
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    ShowProperties: () => <></>,
    ShowPropertiesMenuItem: () => <></>,
    SwitchSelectionMode: () => <></>,
    SwitchSelectionModeMenuItem: () => <></>,
    SwitchViewMode: () => <></>,
    SwitchViewModeMenuItem: () => <></>,
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar: () => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>,
  });

  const handleDocumentLoad = () => {
    const viewer = document.querySelector<HTMLElement>('.rpv-core__inner-pages');
    if (viewer) {
      viewer.style.cssText = `
                            height: 100%;
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            `;
    }
  };

  return (
    <div ref={reader} className={styles.reader}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={dataFile}
          localization={currentLang === 'ru' ? (ru_RU as unknown as LocalizationMap) : undefined}
          characterMap={characterMap}
          plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
          renderError={renderError}
          theme={{
            theme: 'dark',
          }}
          onDocumentLoad={handleDocumentLoad}
        />
      </Worker>
    </div>
  );
}
