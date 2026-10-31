import { useEffect, useMemo, useState } from 'react';
import type { ReactNode, RefObject } from 'react';

import { useTranslation } from 'react-i18next';

import { SiCodewars, SiLeetcode, SiGithub } from 'react-icons/si';

import CircularProgress from '@mui/material/CircularProgress';

import useFetchData from '../../hooks/useFetchData';

import styles from './Progress.module.scss';

const API_ENDPOINTS: Record<string, string> = {
  leetCode: 'https://alfa-leetcode-api.onrender.com/dangor220/solved',
  codeWars: 'https://www.codewars.com/api/v1/users/dangor220',
  gitHub: 'https://api.github.com/users/dangor220',
};

type ProgressProps = {
  progressRef: RefObject<HTMLDivElement>;
  menuIsOpen: boolean;
};

type Metric = {
  platform: string;
  amount: number;
  logo: ReactNode;
  translationKey: string;
};

const getNounForm = (count: number, forms: string): string => {
  const arrayForms = forms.split(',').map((form) => form.trim());

  if (arrayForms.length === 3) {
    if (count % 100 >= 11 && count % 100 <= 19) {
      return arrayForms[2];
    }

    const lastDigit = count % 10;

    if (lastDigit === 1) return arrayForms[0];
    if (lastDigit >= 2 && lastDigit <= 4) return arrayForms[1];

    return arrayForms[2];
  }

  return count === 1 ? arrayForms[0] : arrayForms[1];
};

export default function Progress({ progressRef, menuIsOpen }: ProgressProps): React.ReactNode {
  const { data, isLoading } = useFetchData(API_ENDPOINTS);

  const [animatedCounts, setAnimatedCounts] = useState<Record<string, number>>({});

  const [isVisible, setIsVisible] = useState(false);

  const [t] = useTranslation();

  const metrics: Metric[] = useMemo(
    () => [
      {
        platform: 'LeetCode',
        amount: Number(data?.leetCode?.solvedProblem ?? 44),
        logo: <SiLeetcode color="#FFA116" />,
        translationKey: 'taskProgress',
      },
      {
        platform: 'CodeWars',
        amount: Number(data?.codeWars?.codeChallenges?.totalCompleted ?? 37),
        logo: <SiCodewars color="#B1361E" />,
        translationKey: 'taskProgress',
      },
      {
        platform: 'GitHub',
        amount: Number(data?.gitHub?.public_repos ?? 33),
        logo: <SiGithub color="#fff" />,
        translationKey: 'repoProgress',
      },
    ],
    [data],
  );

  useEffect(() => {
    const element = progressRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [progressRef]);

  useEffect(() => {
    if (!isVisible || isLoading) return;

    const duration = 1400;
    const startTime = performance.now();

    let animationFrame = 0;

    setAnimatedCounts(Object.fromEntries(metrics.map(({ platform }) => [platform, 0])));

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const counts = Object.fromEntries(
        metrics.map(({ platform, amount }) => [platform, Math.round(amount * easedProgress)]),
      );

      setAnimatedCounts(counts);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, isLoading, metrics]);

  return (
    <div className={`${styles.data} ${menuIsOpen ? styles.progressHidden : ''}`}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}> {t('code')}</span>
        <p className={styles.description}>{t('achievements')}</p>
      </div>

      <ul className={styles.list}>
        {metrics.map(({ platform, amount, logo, translationKey }) => {
          const count = animatedCounts[platform] ?? amount;

          return (
            <li className={styles.item} key={platform}>
              <div className={styles.cardHeader}>
                <span className={styles.logo}>{logo}</span>

                <span className={styles.platform}>{platform}</span>
              </div>

              <span className={styles.count}>
                {isLoading ? (
                  <CircularProgress size={30} color="inherit" aria-label="Loading statistics" />
                ) : (
                  count
                )}
              </span>

              <span className={styles.info}>
                {getNounForm(count, t(translationKey))}
                <br />
                {t('on')} {platform}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
