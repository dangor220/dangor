import React, { useRef } from 'react';

import styles from './Contacts.module.scss';
import ContactsForm from '../ContactsForm';
import ContactsData from '../ContactsData';
import { useTranslation } from 'react-i18next';

type ContactsProps = {
  setIsFormFocus: React.Dispatch<React.SetStateAction<boolean>>;
  menuIsOpen: boolean;
};

export default function Contacts({ menuIsOpen, setIsFormFocus }: ContactsProps): React.ReactNode {
  const [t] = useTranslation();
  const contactsRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`${styles.contacts} ${menuIsOpen ? styles.contactsHidden : ''}`}
      id="contacts"
      ref={contactsRef}
      data-anchor>
      <div className={`${styles.wrapper} container`}>
        <ContactsData />
        <span className={`${styles.separator}`}>{t('or')}</span>
        <ContactsForm setIsFormFocus={setIsFormFocus} contactsRef={contactsRef} />
      </div>
    </div>
  );
}
