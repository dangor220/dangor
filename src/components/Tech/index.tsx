import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FaReact, FaGitAlt, FaHtml5 } from 'react-icons/fa';
import { TbBrandCss3 } from 'react-icons/tb';
import {
  SiRedux,
  SiJavascript,
  SiTypescript,
  SiReactrouter,
  SiCssmodules,
  SiAxios,
} from 'react-icons/si';
import { BsFiletypeScss } from 'react-icons/bs';

type stackTypes = {
  data: string[];
  styles: CSSModuleClasses;
  isSkills?: boolean;
};

type techTypes = {
  tech: string;
  image: JSX.Element;
};
type technologiesTypes = techTypes[];

export default function Tech({ data, styles, isSkills }: stackTypes): React.ReactNode {
  let technologies: technologiesTypes = [
    { tech: 'HTML', image: <FaHtml5 fill="#d35c33" /> },
    { tech: 'CSS', image: <TbBrandCss3 color="#3570b2" /> },
    { tech: 'SCSS', image: <BsFiletypeScss color="#c06f98" /> },
    { tech: 'CSS Modules', image: <SiCssmodules color="#fff" /> },
    { tech: 'JavaScript', image: <SiJavascript fill="#eddc68" /> },
    { tech: 'AXIOS', image: <SiAxios fill="#5232dd" /> },
    { tech: 'Git', image: <FaGitAlt color="#df6643" /> },
    { tech: 'React', image: <FaReact color="#86d7f8" /> },
    { tech: 'Redux Toolkit', image: <SiRedux color="#7455b9" /> },
    { tech: 'React Router', image: <SiReactrouter color="#c03121" /> },
    { tech: 'TypeScript', image: <SiTypescript color="#4a7bc4" /> },
  ];

  if (data) {
    const newTech: technologiesTypes = [];

    data.forEach((tech) => {
      technologies.forEach((item) => {
        if (item.tech === tech) {
          newTech.push(item);
        }
      });
    });
    technologies = newTech;
  }

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
    <ul className={styles.list}>
      {technologies.map(({ tech, image }) => (
        <li className={styles.item} key={uuidv4()}>
          {isSkills ? (
            <a
              className={styles.techLink}
              href={`#${tech.toLowerCase()}`}
              onClick={handleLinkClick}>
              {image}
              <span className={styles.hidden}>{tech}</span>
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
