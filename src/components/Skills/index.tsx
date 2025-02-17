import React, { useRef } from 'react';

import styles from './Skills.module.scss';
import Tech from '../Tech';
import Progress from '../Progress';

export default function Skills({ menuIsOpen }: { menuIsOpen: boolean }): React.ReactNode {
  const data: string[] = [
    'HTML',
    'CSS',
    'SCSS',
    'CSS Modules',
    'JavaScript',
    'AXIOS',
    'Git',
    'React',
    'Redux Toolkit',
    'React Router',
    'TypeScript',
  ];
  const progressRef = useRef<HTMLDivElement>(null);

  return (
    <div id="skills">
      <div className={styles.skills} data-anchor>
        <div className={`${styles.wrapper} container`}>
          <Tech data={data} styles={styles} menuIsOpen={menuIsOpen} isSkills />
        </div>
      </div>
      <div ref={progressRef} className={styles.skills} data-anchor>
        <div className={`${styles.wrapper} container`}>
          <Progress progressRef={progressRef} menuIsOpen={menuIsOpen} />
        </div>
      </div>
    </div>
  );
}
