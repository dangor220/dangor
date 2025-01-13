import React from 'react';

import styles from './Description.module.scss';

type descriptionProps = {
  descriptionRef: React.RefObject<HTMLDivElement>;
  description: string | undefined;
};

export default function Description({
  descriptionRef,
  description = "Something's wrong...",
}: descriptionProps): React.ReactNode {
  return (
    <div className={styles.description} ref={descriptionRef}>
      <p className={styles.text}>{description}</p>
    </div>
  );
}
