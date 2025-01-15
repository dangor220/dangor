import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactForm(): React.ReactNode {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const [t] = useTranslation();

  const apiOpenKey = import.meta.env.VITE_API_KEY;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const url = `https://formhub.dev/io/${apiOpenKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        if (result === 'OK') {
          console.log('Message was send');
        } else {
          console.log('Error: ' + result);
        }
      } else {
        console.error('Error: ', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  return (
    <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
      <div className="user-data">
        <input
          type="text"
          name="name"
          placeholder={t('placeholderName')}
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder={t('placeholderEmail')}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="user-message">
        <input
          type="text"
          name="message"
          value={message}
          placeholder={t('placeholderMessage')}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <input type="hidden" name="redirect-to" value="no-redirect"></input>
      <button type="submit" id="submit-button">
        {t('submitForm')}
      </button>
    </form>
  );
}
