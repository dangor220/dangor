import React from 'react';

import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import styles from './ContactsData.module.scss';
import { useTranslation } from 'react-i18next';

export default function ContactsData(): React.ReactNode {
  const contacts = [
    {
      name: 'telegram',
      data: 'https://t.me/dangor220',
      image: <TelegramIcon aria-hidden="true" />,
    },
    {
      name: 'email',
      data: 'mailto:dan.gor220@yandex.ru',
      image: <EmailIcon aria-hidden="true" />,
    },
    {
      name: 'phone',
      data: 'tel:+79113908087',
      image: <PhoneIcon aria-hidden="true" />,
    },
  ];
  const [t] = useTranslation();

  return (
    <ul className={styles.contacts}>
      {contacts.map(({ name, data, image }, index) => (
        <li className={styles.contact} key={index}>
          <a
            className={styles.link}
            href={data}
            target={name === 'telegram' ? '_blank' : undefined}
            rel={name === 'telegram' ? 'noopener noreferrer' : undefined}>
            {image}
            <span>{t(name)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
