import React from 'react';

import styles from './Description.module.scss';

type descriptionProps = {
  descriptionRef: React.RefObject<HTMLDivElement>;
  fullDescription: string | undefined;
};

export default function FullDescription({
  descriptionRef,
  fullDescription = "Something's wrong...",
}: descriptionProps): React.ReactNode {
  return (
    <div className={styles.description} ref={descriptionRef}>
      <p className={styles.text}>{fullDescription}</p>
    </div>
  );
}
