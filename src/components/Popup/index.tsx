import React from 'react';
import { Document } from 'react-pdf';

import styles from './Popup.module.scss';

export default function Popup({ dataFile }): React.ReactNode {
  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <Document file={dataFile} />
      </div>
      <div className={styles.close}>x</div>
    </div>
  );
}
