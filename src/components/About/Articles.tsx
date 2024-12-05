import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './About.module.scss';
import { useTranslation } from 'react-i18next';

type article = {
  title: string;
  description: string;
  open?: string;
  presentation?: string;
  certificate?: string;
};

export default function Articles(): React.ReactNode {
  const [t] = useTranslation();

  const articles: article[] = [
    {
      title: 'articleTitle_1',
      description: 'articleDescription_1',
      open: '',
      presentation: '',
      certificate: '',
    },
    {
      title: 'articleTitle_2',
      description: 'articleDescription_2',
      open: '',
      presentation: '',
      certificate: '',
    },
    {
      title: 'articleTitle_3',
      description: 'articleDescription_3',
      open: '',
      presentation: '',
      certificate: '',
    },
    {
      title: 'articleTitle_4',
      description: 'articleDescription_4',
      open: '',
      presentation: '',
      certificate: '',
    },
    {
      title: 'articleTitle_5',
      description: 'articleDescription_5',
      open: '',
      presentation: '',
      certificate: '',
    },
  ];
  return (
    <>
      {articles.map((article, index) => (
        <li
          className={styles.article}
          key={uuidv4()}
          {...(index !== 0 ? { 'data-anchor': true } : {})}>
          <div className={styles.title}>{t(article.title)}</div>
          <div className={styles.content}>
            <div className={styles.description}>{t(article.description)}</div>
            <div className={styles.links}>text</div>
          </div>
        </li>
      ))}
    </>
  );
}
