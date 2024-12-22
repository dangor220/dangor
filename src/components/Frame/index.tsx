import React from 'react';
import styles from './Frame.module.scss';

type frameProps = {
  frameRef: React.RefObject<HTMLDivElement>;
  projectLink?: string;
};

export default function Frame({ projectLink, frameRef }: frameProps): React.ReactNode {
  return (
    <div ref={frameRef}>
      <iframe className={styles.iframe} src={projectLink}></iframe>
    </div>
  );
}
