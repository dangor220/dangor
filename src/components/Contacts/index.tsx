import React from 'react';

import styles from './Contacts.module.scss';

export default function Contacts(): React.ReactNode {
  return <div className={`${styles.contacts} container`} id="contacts" data-anchor></div>;
}
