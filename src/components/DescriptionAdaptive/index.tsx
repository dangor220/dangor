import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DescriptionAdaptive.module.scss';

type DescriptionProps = {
  text: string;
  clientWidth: number;
  clientHeight: number;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
  setPopupData: React.Dispatch<React.SetStateAction<string | undefined>>;
  content?: React.RefObject<HTMLDivElement>;
  type?: 'default' | 'articles' | 'projects';
};

const FONT_SIZE = 16; // Base font size in pixels
const SYMBOL_WIDTH = FONT_SIZE * 0.6 + 0.5; // Approximate symbol width
const LINE_HEIGHT = FONT_SIZE * 1.5; // Line height based on font size
const HEADER_PADDING = 150; // Header height with padding

export default function DescriptionAdaptive({
  text,
  type = 'default',
  content,
  clientWidth,
  clientHeight,
  setPopup,
  setPopupData,
}: DescriptionProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [adaptiveText, setAdaptiveText] = useState<string>('');
  const [isShortText, setIsShortText] = useState<boolean>(false);

  useEffect(() => {
    if (!content?.current) return;

    const calculateMaxSymbols = (): number => {
      const contentRect = content?.current?.getBoundingClientRect();
      if (!contentRect) return 0;

      const availableHeight = (() => {
        switch (type) {
          case 'articles':
            return (clientHeight - HEADER_PADDING) / 2;
          case 'projects':
            return contentRect.height - 30;
          default:
            return clientHeight - HEADER_PADDING;
        }
      })();

      const maxSymbolsInRow = contentRect.width / SYMBOL_WIDTH;
      const maxRows = availableHeight / LINE_HEIGHT;

      return Math.floor(maxSymbolsInRow * maxRows);
    };

    const generateShortText = (): string => {
      const resolvedLang = i18n.language;
      let maxSymbols = calculateMaxSymbols();

      if (resolvedLang === 'ru') {
        maxSymbols = Math.floor(maxSymbols * 0.7); // Adjust for longer average word length in Russian
      }

      if (
        !maxSymbols ||
        maxSymbols >= text.length ||
        (clientWidth >= 1024 && clientHeight >= 768)
      ) {
        setIsShortText(false);
        return text;
      }

      const truncatedText = text.slice(0, maxSymbols - 20).replace(/[.,\s]+$/, '');
      setIsShortText(true);
      return `${truncatedText}... `;
    };

    setAdaptiveText(generateShortText());
  }, [clientHeight, clientWidth, content, text, type, i18n.language]);

  return (
    <p>
      {adaptiveText}
      {isShortText && (
        <a
          onClick={() => {
            setPopup('description');
            setPopupData(text);
          }}
          className={styles.readMore}>
          {t('readMore')}
        </a>
      )}
    </p>
  );
}
