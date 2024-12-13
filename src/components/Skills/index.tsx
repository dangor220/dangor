import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FaReact, FaGitAlt, FaHtml5 } from 'react-icons/fa';
import { SiRedux } from 'react-icons/si';
import { BiLogoTypescript } from 'react-icons/bi';
import { TbBrandCss3 } from 'react-icons/tb';
import { RiJavascriptFill } from 'react-icons/ri';
import { BsFiletypeScss } from 'react-icons/bs';

import styles from './Skills.module.scss';

export default function Skills(): React.ReactNode {
  const skills = [
    { skill: 'HTML', image: <FaHtml5 /> },
    { skill: 'CSS', image: <TbBrandCss3 /> },
    { skill: 'SCSS', image: <BsFiletypeScss /> },
    { skill: 'JavaScript', image: <RiJavascriptFill /> },
    { skill: 'Git', image: <FaGitAlt /> },
    { skill: 'React', image: <FaReact /> },
    { skill: 'Redux Toolkit', image: <SiRedux /> },
    { skill: 'TypeScript', image: <BiLogoTypescript /> },
  ];
  return (
    <div className={styles.skills} id="skills" data-anchor>
      <div className={`${styles.wrapper} container`}>
        <ul className={styles.list}>
          {skills.map(({ skill, image }) => (
            <li className={styles.item} key={uuidv4()}>
              {image}
              <span className={styles.hidden}>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
