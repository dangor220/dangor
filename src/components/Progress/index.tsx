import styles from './Progress.module.scss';
import useFetchData from '../../hooks/useFetchData';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SiCodewars } from 'react-icons/si';
import { SiLeetcode } from 'react-icons/si';
import { SiGithub } from 'react-icons/si';

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const API_ENDPOINTS: Record<string, string> = {
  leetCode: 'https://leetcode-stats-api.herokuapp.com/dangor220',
  codeWars: 'https://www.codewars.com/api/v1/users/dangor220',
  gitHub: 'https://api.github.com/users/dangor220',
};
type ProgressProps = {
  progressRef: React.RefObject<HTMLDivElement>;
};

export default function Progress({ progressRef }: ProgressProps) {
  const [countCompletedTasks, setCountCompletedTasks] = useState<
    [string, number, React.ReactNode][]
  >([
    ['LeetCode', 39, <SiLeetcode key="leetcode" />],
    ['CodeWars', 37, <SiCodewars key="codewars" />],
    ['GitHub', 33, <SiGithub key="github" />],
  ]);
  const { data, isLoading } = useFetchData(API_ENDPOINTS);
  const [animatedCounts, setAnimatedCounts] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(true);

  const [t] = useTranslation();

  const animatedCount = (platform: string, targetAmount: number) => {
    setHasAnimated(false);
    let current = 0;
    const step = Math.max(1, Math.floor(targetAmount / 50));
    const interval = setInterval(() => {
      current += step;
      if (current >= targetAmount) {
        current = targetAmount;
        clearInterval(interval);
      }
      setAnimatedCounts((prev) => ({ ...prev, [platform]: current }));
    }, 80);
  };

  const getNounForm = (count: number, forms: string) => {
    const arrayForms = forms.split(',');

    if (arrayForms.length === 3) {
      if (count % 100 >= 11 && count % 100 <= 19) return arrayForms[2];
      const lastDigit = count % 10;
      if (lastDigit === 1) return arrayForms[0];
      if (lastDigit >= 2 && lastDigit <= 4) return arrayForms[1];
      return arrayForms[2];
    } else {
      return count === 1 ? arrayForms[0] : arrayForms[1];
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );
    if (progressRef.current) observer.observe(progressRef.current);
    return () => observer.disconnect();
  }, [progressRef]);

  useEffect(() => {
    if (Object.entries(data).length && isVisible && hasAnimated) {
      const tasks: [string, number, React.ReactNode][] = [
        ['LeetCode', data?.leetCode?.totalSolved || 39, <SiLeetcode />],
        ['CodeWars', data?.codeWars?.codeChallenges?.totalCompleted || 37, <SiCodewars />],
        ['GitHub', data?.gitHub?.public_repos || 33, <SiGithub />],
      ];
      setCountCompletedTasks(tasks);
      tasks.forEach(([platform, amount]) => animatedCount(platform, amount));
    }
  }, [data, isVisible, hasAnimated]);

  return (
    <div className={styles.data}>
      <ul className={styles.list}>
        {}
        {countCompletedTasks.map(([platform, amount, logo]) => (
          <li className={styles.item} key={platform}>
            <span className={styles.logo}>{logo}</span>
            <span className={styles.count}>
              {isLoading ? (
                <Stack direction="column" alignItems="center">
                  <CircularProgress size={30} color={'inherit'} />
                </Stack>
              ) : (
                animatedCounts[platform] ?? 0
              )}
            </span>
            <span className={styles.info}>
              {getNounForm(
                amount ?? 0,
                t(platform === 'GitHub' ? 'projectProgress' : 'taskProgress'),
              )}{' '}
              {t('on')}
              <br /> {platform}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
