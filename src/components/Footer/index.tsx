import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';

export default function Footer(): React.ReactNode {
  const { t } = useTranslation();
  return <footer className={styles.footer}>© 2025 {t('name')}</footer>;
}
