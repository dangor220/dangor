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
    'Supabase',
    'React',
    'Redux Toolkit',
    'React Router',
    'TypeScript',
    'NextJS',
  ];

  const progressRef = useRef<HTMLDivElement>(null);

  return (
    <div id="skills">
      {/* Technology stack */}
      <section className={styles.skills} data-anchor>
        <div className={`${styles.wrapper} container`}>
          <Tech data={data} styles={styles} menuIsOpen={menuIsOpen} isSkills />
        </div>
      </section>

      {/* Coding activity */}
      <section ref={progressRef} className={styles.skills} data-anchor>
        <div className={`${styles.wrapper} container`}>
          <Progress progressRef={progressRef} menuIsOpen={menuIsOpen} />
        </div>
      </section>
    </div>
  );
}
