import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FaReact, FaGitAlt, FaHtml5 } from 'react-icons/fa';
import { SiRedux } from 'react-icons/si';
import { TbBrandCss3 } from 'react-icons/tb';
import { SiJavascript, SiTypescript } from 'react-icons/si';
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
    { tech: 'HTML', image: <FaHtml5 /> },
    { tech: 'CSS', image: <TbBrandCss3 /> },
    { tech: 'SCSS', image: <BsFiletypeScss /> },
    { tech: 'JavaScript', image: <SiJavascript /> },
    { tech: 'Git', image: <FaGitAlt /> },
    { tech: 'React', image: <FaReact /> },
    { tech: 'Redux Toolkit', image: <SiRedux /> },
    { tech: 'TypeScript', image: <SiTypescript /> },
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
    console.log(targetId);

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
