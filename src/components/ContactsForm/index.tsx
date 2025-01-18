import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './ContactsForm.module.scss';

type ContactFormProps = {
  setIsFormFocus: React.Dispatch<React.SetStateAction<boolean>>;
  contactsRef: React.RefObject<HTMLDivElement>;
};

enum MessageStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export default function ContactsForm({
  setIsFormFocus,
  contactsRef,
}: ContactFormProps): React.ReactNode {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState<MessageStatus>(MessageStatus.Idle);

  const formRef = useRef<HTMLFormElement>(null);
  const [t] = useTranslation();

  const apiOpenKey = import.meta.env.VITE_API_KEY;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const url = `https://formhub.dev/io/${apiOpenKey}`;

    setMessageStatus(MessageStatus.Loading);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        if (result === 'OK') {
          console.log('Message was send');
          setUser('');
          setEmail('');
          setMessage('');
          setMessageStatus(MessageStatus.Success);
        } else {
          console.log('Error: ' + result);
          setMessageStatus(MessageStatus.Failed);
        }
      } else {
        console.error('Error: ', response.status, response.statusText);
        setMessageStatus(MessageStatus.Failed);
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessageStatus(MessageStatus.Failed);
    } finally {
      setIsFormFocus(false);
      setTimeout(() => {
        setMessageStatus(MessageStatus.Idle);
      }, 2000);
    }
  };

  const renderButtonContent = () => {
    switch (messageStatus) {
      case MessageStatus.Loading:
        return (
          <>
            {t('loading')}
            <Stack direction="column" alignItems="center">
              <CircularProgress size={20} color={'inherit'} />
            </Stack>
          </>
        );
      case MessageStatus.Success:
        return t('messageSent');
      case MessageStatus.Failed:
        return t('messageFailed');
      default:
        return t('submitForm');
    }
  };

  const scrollToForm = () => {
    if (contactsRef && contactsRef.current) {
      const scrollToForm = contactsRef.current?.getBoundingClientRect().y + window.scrollY;

      window.scrollTo({
        top: scrollToForm,
      });
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsFormFocus(true);
    scrollToForm();
  };

  const handleUnfocus: React.FocusEventHandler<HTMLFormElement> = (event) => {
    if (!formRef.current?.contains(event.relatedTarget as Node)) {
      setIsFormFocus(false);
    }
  };

  return (
    <form
      className={styles.contact}
      id="contact-form"
      action="#"
      method="POST"
      ref={formRef}
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      onBlur={handleUnfocus}>
      <div className={styles.data}>
        <input
          className={styles.name}
          type="text"
          name="name"
          placeholder={t('placeholderName')}
          required
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <input
          className={styles.email}
          type="email"
          name="email"
          value={email}
          placeholder={t('placeholderEmail')}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className={styles.content}>
        <textarea
          className={styles.message}
          name="message"
          value={message}
          placeholder={t('placeholderMessage')}
          required
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <input type="hidden" name="redirect-to" value="no-redirect"></input>
      <button
        className={styles.submit}
        id="submit-button"
        type="submit"
        disabled={messageStatus === MessageStatus.Loading}>
        {renderButtonContent()}
      </button>
    </form>
  );
}
