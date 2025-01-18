import React, { useRef } from 'react';

import styles from './Contacts.module.scss';
import ContactsForm from '../ContactsForm';
import ContactsData from '../ContactsData';
import { useTranslation } from 'react-i18next';

type ContactsProps = {
  setIsFormFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Contacts({ setIsFormFocus }: ContactsProps): React.ReactNode {
  const [t] = useTranslation();
  const contactsRef = useRef<HTMLDivElement>(null);
  return (
    <div className={`${styles.contacts}`} id="contacts" ref={contactsRef} data-anchor>
      <div className={`${styles.wrapper} container`}>
        <ContactsData />
        <span>{t('or')}</span>
        <ContactsForm setIsFormFocus={setIsFormFocus} contactsRef={contactsRef} />
      </div>
    </div>
  );
}
