import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './Articles.module.scss';
import { useTranslation } from 'react-i18next';

import YouTubeIcon from '@mui/icons-material/YouTube';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

import roleAI from '../../assets/articles/articlesPDF/role_ai.pdf';
import stackMern from '../../assets/articles/articlesPDF/stack_mern.pdf';
import informationSecurity from '../../assets/articles/articlesPDF/modern_approaches_information_security.pdf';
import dynamicProgramming from '../../assets/articles/articlesPDF/dynamic_programming.pdf';
import applicationAI from '../../assets/articles/articlesPDF/application_ai_technology.pdf';
import developmentSkills from '../../assets/articles/articlesPDF/development_skills.pdf';

import developmentSkillsCertificate from '../../assets/articles/certificates/MUIV.pdf';
import stackMernCertificate from '../../assets/articles/certificates/MFUA.pdf';
import dynamicProgrammingCertificate from '../../assets/articles/certificates/NSCF.pdf';
import applicationAICertificate from '../../assets/articles/certificates/SIBFU.pdf';

import sibfuQualification from '../../assets/articles/qualification/SIBFU.pdf';

type article = {
  title: string;
  subtitle: string;
  info: string;
  description: string;
  githubLink?: string;
  youtubeLink?: string;
  libraryLink?: string;
  articlePDF?: string;
  certificate?: string;
  qualification?: string;
};

export default function Articles({ setPopup, setPopupData }): React.ReactNode {
  const [t] = useTranslation();

  const articles: article[] = [
    {
      title: 'dynamicProgramming',
      subtitle: 'location_1',
      info: 'date_1',
      description: 'dynamicProgrammingDescription',
      githubLink: 'https://github.com/dangor220/dynamic-programming',
      youtubeLink: 'https://www.youtube.com/watch?v=8SOLa45m8fk&t',
      libraryLink: 'https://2023.nscf.ru/nauchno-prakticheskaya-konferenciya/tezisy-dokladov/',
      articlePDF: dynamicProgramming,
      certificate: dynamicProgrammingCertificate,
    },
    {
      title: 'applicationAI',
      subtitle: 'location_2',
      info: 'date_2',
      description: 'applicationAIDescription',
      libraryLink: 'https://elibrary.ru/item.asp?id=54778520',
      articlePDF: applicationAI,
      certificate: applicationAICertificate,
      qualification: sibfuQualification,
    },
    {
      title: 'informationSecurity',
      subtitle: 'location_3',
      info: 'date_3',
      description: 'informationSecurityDescription',
      libraryLink: 'https://elibrary.ru/item.asp?id=65636243',
      articlePDF: informationSecurity,
    },
    {
      title: 'roleAI',
      subtitle: 'location_4',
      info: 'date_4',
      description: 'roleAIDescription',
      libraryLink: 'https://elibrary.ru/item.asp?id=59718633',
      articlePDF: roleAI,
    },
    {
      title: 'stackMern',
      subtitle: 'location_5',
      info: 'date_5',
      description: 'stackMernDescription',
      libraryLink: 'https://elibrary.ru/item.asp?id=60386336',
      articlePDF: stackMern,
      certificate: stackMernCertificate,
    },
    {
      title: 'developmentSkills',
      subtitle: 'location_6',
      info: 'date_6',
      description: 'developmentSkillsDescription',
      libraryLink: 'https://elibrary.ru/item.asp?id=50271544',
      articlePDF: developmentSkills,
      certificate: developmentSkillsCertificate,
    },
  ];

  const handleOpenPDF = (data) => {
    setPopup(true);
    setPopupData(data);
  };

  const clientWidth = window.innerWidth;

  return (
    <>
      <ul className={styles.articles}>
        {articles.map((article, index) => (
          <li
            className={styles.article}
            key={uuidv4()}
            {...(clientWidth <= 768
              ? { 'data-anchor': true }
              : index !== 0
              ? { 'data-anchor': true }
              : {})}>
            <div className={styles.title}>{t(article.title)}</div>
            <div className={styles.subtitle}>{t(article.subtitle) + ' ' + t(article.info)}</div>
            <div className={styles.content}>
              <div className={styles.description}>{t(article.description)}</div>
              <div className={styles.resources}>
                {article.youtubeLink && (
                  <button className={styles.icon}>
                    <a href={article.youtubeLink} target="_blank">
                      <YouTubeIcon />
                    </a>
                  </button>
                )}
                {article.articlePDF && (
                  <button
                    className={styles.icon}
                    onClick={() => {
                      handleOpenPDF(article.articlePDF);
                    }}>
                    <PictureAsPdfIcon />
                  </button>
                )}
                {article.certificate && (
                  <button
                    className={styles.icon}
                    onClick={() => {
                      handleOpenPDF(article.certificate);
                    }}>
                    <EmojiEventsIcon />
                  </button>
                )}
                {article.qualification && (
                  <button
                    className={styles.icon}
                    onClick={() => {
                      handleOpenPDF(article.qualification);
                    }}>
                    <SchoolIcon />
                  </button>
                )}
                {article.githubLink && (
                  <button className={styles.icon}>
                    <a href={article.githubLink} target="_blank">
                      <GitHubIcon />
                    </a>
                  </button>
                )}
                {article.libraryLink && (
                  <button className={styles.icon}>
                    <a href={article.libraryLink} target="_blank">
                      <LinkIcon />
                    </a>
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}{' '}
      </ul>
    </>
  );
}