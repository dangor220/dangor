import React from 'react';

import styles from './Popup.module.scss';

export default function Popup(): React.ReactNode {
  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <img
          className={styles.image}
          src="https://drive.google.com/uc?export=view&id=1hVzLU5S1rcD_VUMFls5DUkEoeSp4iNXb"
          alt=""
        />
      </div>
      <div className={styles.close}>x</div>
    </div>
  );
}
