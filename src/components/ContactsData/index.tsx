import React from 'react';

import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import styles from './ContactsData.module.scss';
import { useTranslation } from 'react-i18next';

export default function ContactsData(): React.ReactNode {
  const contacts = [
    { name: 'telegram', data: 'https://t.me/dangor220', image: <TelegramIcon /> },
    { name: 'email', data: 'mailto:dan.gor220@yandex.ru', image: <EmailIcon /> },
    { name: 'phone', data: 'tel:+79113908087', image: <PhoneIcon /> },
  ];
  const [t] = useTranslation();

  return (
    <ul className={styles.contacts}>
      {contacts.map(({ name, data, image }) => (
        <li className={styles.contact}>
          <a className={styles.link} href={data} target="_blank">
            {image}
            {<span>{t(name)}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
