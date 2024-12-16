import React from 'react';

import styles from './Projects.module.scss';
import Popup from '../Popup';

type popupType = {
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
};

export default function Projects({ popup, setPopup }: popupType): React.ReactNode {
  const handleClick = () => {
    setPopup('project');
  };
  return (
    <div className={styles.projects} id="projects" data-anchor>
      <div className={`${styles.wrapper} container`}>
        {popup === 'project' && <Popup popup={popup} setPopup={setPopup} />}
        <div onClick={handleClick}>click</div>
      </div>
    </div>
  );
}
