import React from 'react';

import styles from './Contacts.module.scss';
import ContactForm from '../ContactForm';

export default function Contacts(): React.ReactNode {
  return (
    <div className={`${styles.contacts}`} id="contacts" data-anchor>
      <div className={`${styles.wrapper} container`}>
        <ContactForm />
      </div>
    </div>
  );
}
