import React from 'react';

import { FaReact, FaGitAlt, FaHtml5 } from 'react-icons/fa';
import { TbBrandCss3, TbBrandNextjs, TbBrandSupabase } from 'react-icons/tb';

import {
  SiRedux,
  SiJavascript,
  SiTypescript,
  SiReactrouter,
  SiCssmodules,
  SiAxios,
} from 'react-icons/si';

import { BsFiletypeScss } from 'react-icons/bs';

type StackTypes = {
  data: string[];
  styles: CSSModuleClasses;
  menuIsOpen?: boolean;
  isSkills?: boolean;
};

type Technology = {
  tech: string;
  image: React.ReactNode;
};

export default function Tech({ data, styles, isSkills, menuIsOpen }: StackTypes): React.ReactNode {
  const iconByTechnology: Record<string, React.ReactNode> = {
    HTML: <FaHtml5 fill="#d35c33" />,
    CSS: <TbBrandCss3 color="#3570b2" />,
    SCSS: <BsFiletypeScss color="#c06f98" />,

    'CSS Modules': (
      <SiCssmodules
        style={{
          color: isSkills ? '#fff' : 'var(--css-modules-tech-icon)',
        }}
      />
    ),

    JavaScript: <SiJavascript fill="#eddc68" />,
    AXIOS: <SiAxios fill="#5232dd" />,
    Git: <FaGitAlt color="#df6643" />,
    React: <FaReact color="#86d7f8" />,
    Supabase: <TbBrandSupabase color="#38cd8e" />,
    'Redux Toolkit': <SiRedux color="#7455b9" />,
    'React Router': <SiReactrouter color="#c03121" />,
    TypeScript: <SiTypescript color="#4a7bc4" />,

    NextJS: (
      <TbBrandNextjs
        style={{
          color: isSkills ? '#fff' : 'var(--nextjs-tech-icon)',
        }}
      />
    ),
  };

  const technologies: Technology[] = data.flatMap((tech) => {
    const image = iconByTechnology[tech];

    return image ? [{ tech, image }] : [];
  });

  // ЭТУ ФУНКЦИЮ ОСТАВЛЯЕМ БЕЗ ИЗМЕНЕНИЙ

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);

    if (!targetId) return;

    const targetElements = [...document.querySelectorAll('[data-tech]')];

    const targetElementsStack = targetElements.filter((element) =>
      element.getAttribute('data-tech')?.toLowerCase()?.split(',').includes(targetId),
    );

    const randomProject =
      targetElementsStack[Math.floor(Math.random() * targetElementsStack.length)];

    if (randomProject) {
      randomProject.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ul className={`${styles.list} ${menuIsOpen ? styles.titleHidden : ''}`}>
      {technologies.map(({ tech, image }) => (
        <li className={styles.item} key={tech}>
          {isSkills ? (
            <a
              className={styles.techLink}
              href={`#${tech.toLowerCase()}`}
              onClick={handleLinkClick}>
              {image}
              <span className={styles.techName}>{tech}</span>
            </a>
          ) : (
            <>
              {image}
              <span className={styles.hidden}>{tech}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
