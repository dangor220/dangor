import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './Projects.module.scss';
import Popup from '../Popup';

import jsplayer from '../../assets/images/projects/preview/JSPlayer.jpg';

import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tech from '../Tech';

type popupType = {
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
};

type projectsType = {
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  stack: string[];
};

export default function Projects({ popup, setPopup }: popupType): React.ReactNode {
  const projects: projectsType[] = [
    {
      title: 'JSPlayer',
      description:
        'During the training, I became interested in the process of implementing my own audio player. As a result, a small project was written which I plan to rewrite with a fresh look and new technologies.',
      image: jsplayer,
      link: 'https://dangor220.github.io/audio-player/',
      github: 'https://github.com/dangor220/audio-player',
      stack: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: '2',
      description:
        'During the training, I became interested in the process of implementing my own audio player. As a result, a small project was written which I plan to rewrite with a fresh look and new technologies.',
      image: jsplayer,
      link: 'https://dangor220.github.io/audio-player/',
      github: 'https://github.com/dangor220/audio-player',
      stack: ['HTML', 'CSS'],
    },
    {
      title: '3',
      description:
        'During the training, I became interested in the process of implementing my own audio player. As a result, a small project was written which I plan to rewrite with a fresh look and new technologies.',
      image: jsplayer,
      link: 'https://dangor220.github.io/audio-player/',
      github: 'https://github.com/dangor220/audio-player',
      stack: ['HTML', 'CSS', 'JavaScript'],
    },
  ];

  const handleClickProject = () => {
    setPopup('project');
  };
  return (
    <div className={styles.projects} id="projects" data-anchor>
      <div className={`${styles.wrapper} container`}>
        {popup === 'project' && <Popup popup={popup} setPopup={setPopup} />}
        {projects.map(({ title, description, image, link, github, stack }, index) => (
          <div
            className={styles.project}
            key={uuidv4()}
            data-tech={stack}
            {...(index !== 0 ? { 'data-anchor': true } : {})}>
            <div className={`${styles.preview}`} onClick={handleClickProject}>
              <img className={`${styles.image} ${styles.animate}`} src={image} alt={title} />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>{title}</div>
              <div className={styles.description}>{description}</div>

              <Tech data={stack} styles={styles} />

              <ul className={styles.links}>
                <li>
                  <a className={styles.link} href={link} target="_blank">
                    <OpenInNewIcon />
                  </a>
                </li>
                <li>
                  <a className={styles.link} href={github} target="_blank">
                    <GitHubIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
