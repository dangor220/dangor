import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AdaptiveDescription.module.scss';

type descriptionProps = {
  text: string;
  clientWidth: number;
  clientHeight: number;
  contentWidth?: number;
  contentHeight?: number;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
  setPopupData: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function AdaptiveDescription({
  text,
  clientWidth,
  clientHeight,
  contentWidth,
  contentHeight,
  setPopup,
  setPopupData,
}: descriptionProps): React.ReactNode {
  const [t] = useTranslation();
  const description = text;
  let maxSymbols = clientHeight / 2;

  if (contentWidth && contentHeight) {
    if (document.documentElement.lang === 'ru') {
      maxSymbols = contentHeight / 2;
    } else {
      maxSymbols = contentHeight * 0.7;
    }
  }

  if (description.length > maxSymbols && (clientWidth <= 768 || clientHeight <= 690)) {
    let shortDescription = description.substring(0, maxSymbols);

    if (shortDescription[shortDescription.length - 1] === '.') {
      shortDescription += '.. ';
    } else {
      shortDescription += '... ';
    }

    return (
      <p>
        {shortDescription}{' '}
        <a
          onClick={() => {
            setPopup('description');
            setPopupData(description);
          }}
          className={styles.readMore}>
          {t('readMore')}
        </a>
      </p>
    );
  }

  return description;
}
