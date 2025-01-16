import React from 'react';

import styles from './Contacts.module.scss';
import ContactForm from '../ContactForm';

type ContactsProps = {
  setIsFormFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Contacts({ setIsFormFocus }: ContactsProps): React.ReactNode {
  return (
    <div className={`${styles.contacts}`} id="contacts" data-anchor>
      <div className={`${styles.wrapper} container`}>
        <ContactForm setIsFormFocus={setIsFormFocus} />
      </div>
    </div>
  );
}
