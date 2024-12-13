import React from 'react';

import styles from './Projects.module.scss';

export default function Projects(): React.ReactNode {
  return (
    <div className={styles.projects} id="projects" data-anchor>
      <div className={`${styles.wrapper} container`}>
        <iframe
          src="https://dangor220.github.io/audio-player/"
          width="500px"
          height="500px"></iframe>
      </div>
    </div>
  );
}
