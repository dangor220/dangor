import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Projects.module.scss';
import Popup from '../Popup';

import jsplayer from '../../assets/images/projects/preview/JSPlayer.png';
import reactpizza from '../../assets/images/projects/preview/react-pizza.png';
import mathwithsonya from '../../assets/images/projects/preview/mathwithsonya.png';

import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tech from '../Tech';
import DescriptionAdaptive from '../DescriptionAdaptive';

type popupType = {
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
  clientWidth: number;
  clientHeight: number;
  setPopupData: React.Dispatch<React.SetStateAction<string | undefined>>;
};

type projectsType = {
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  stack: string[];
};

export default function Projects({
  popup,
  setPopup,
  clientWidth,
  clientHeight,
  setPopupData,
}: popupType): React.ReactNode {
  const projects: projectsType[] = [
    {
      title: 'Math with Sonya',
      description: 'mathwithsonyaDescription',
      image: mathwithsonya,
      link: 'https://www.mathwithsonya.ru/',
      github: 'https://github.com/dangor220/mathwithsonya',
      stack: ['NextJS', 'TypeScript', 'SCSS', 'CSS Modules', 'AXIOS', 'Git'],
    },
    {
      title: 'JSPlayer',
      description: 'jsplayerDescription',
      image: jsplayer,
      link: 'https://dangor220.github.io/audio-player/',
      github: 'https://github.com/dangor220/audio-player',
      stack: ['HTML', 'CSS', 'JavaScript', 'Git'],
    },
    {
      title: 'React Pizza',
      description: 'reactpizzaDescription',
      image: reactpizza,
      link: 'https://dangor220.github.io/react-pizza',
      github: 'https://github.com/dangor220/react-pizza',
      stack: [
        'React',
        'Redux Toolkit',
        'React Router',
        'TypeScript',
        'CSS Modules',
        'SCSS',
        'AXIOS',
        'Git',
      ],
    },
  ];

  const [t] = useTranslation();
  const [link, setLink] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickProject = (link: string) => {
    setPopup('project');
    setLink(link);
  };
  return (
    <div className={styles.projects} id="projects" data-anchor>
      {popup === 'project' && <Popup popup={popup} setPopup={setPopup} link={link} />}
      <div className={`${styles.wrapper}`}>
        {projects.map(({ title, description, image, link, github, stack }, index) => (
          <div
            className={styles.project}
            key={index}
            data-tech={stack}
            {...(index !== 0 ? { 'data-anchor': true } : {})}>
            <div
              className={`${styles.preview}`}
              onClick={() => {
                handleClickProject(link);
              }}>
              <img className={styles.image} src={image} alt={title} />
            </div>
            <div className={styles.about}>
              <div className={styles.info} ref={contentRef}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>
                  {
                    <DescriptionAdaptive
                      text={t(description)}
                      type={'projects'}
                      content={contentRef}
                      clientWidth={clientWidth}
                      clientHeight={clientHeight}
                      setPopup={setPopup}
                      setPopupData={setPopupData}
                    />
                  }
                </div>
              </div>

              <div className={styles.data}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
