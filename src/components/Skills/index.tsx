import React from 'react';

import styles from './Skills.module.scss';
import Tech from '../Tech';

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

  return (
    <div className={styles.skills} id="skills" data-anchor>
      <div className={`${styles.wrapper} container`}>
        <Tech data={data} styles={styles} menuIsOpen={menuIsOpen} isSkills />
      </div>
    </div>
  );
}
