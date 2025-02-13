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

  // const leetCodeApi = 'https://alfa-leetcode-api.onrender.com/dangor220/solved';
  // const codeWarsAPI = 'https://www.codewars.com/api/v1/users/dangor220';
  // const gitHubAPI = 'https://api.github.com/users/dangor220';

  return (
    <div id="skills">
      {/* <div className={styles.skills} data-anchor>
        <div className={`${styles.wrapper} container`}>
          <Tech data={data} styles={styles} menuIsOpen={menuIsOpen} isSkills />
        </div>
      </div> */}
      <div className={styles.skills} data-anchor>
        <div className={`${styles.wrapper} container`}></div>
      </div>
    </div>
  );
}
