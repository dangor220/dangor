import styles from './Hamburger.module.scss';

import React from 'react';

export default function Hamburger({
  headerIsFixed,
  menuIsOpen,
}: {
  headerIsFixed: boolean;
  menuIsOpen: boolean;
}): React.ReactNode {
  return (
    <svg
      className={`${styles.ham} ${styles.hamRotate} ${styles.ham8} ${
        menuIsOpen ? styles.active : ''
      }`}
      viewBox="0 0 100 100"
      width="50">
      <path
        className={`${styles.line} ${headerIsFixed ? styles.lineBlack : ''} ${styles.top}`}
        d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
      />
      <path
        className={`${styles.line} ${headerIsFixed ? styles.lineBlack : ''}  ${styles.middle}`}
        d="m 30,50 h 40"
      />
      <path
        className={`${styles.line} ${headerIsFixed ? styles.lineBlack : ''}  ${styles.bottom}`}
        d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
      />
    </svg>
  );
}
