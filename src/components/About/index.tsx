import React from 'react';

import styles from './About.module.scss';

export default function About(): React.ReactNode {
  return (
    <div className={styles.about} id="about" data-anchor="about">
      <div className={`${styles.wrapper} container`}>
        <div className={styles.info}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias error necessitatibus
            est, ea maxime maiores fugiat similique alias quis deserunt? Dolorem suscipit quam modi
            in consequatur cupiditate error amet quibusdam? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit.
          </p>
          <p>
            Molestias error necessitatibus est, ea maxime maiores fugiat similique alias quis
            deserunt? Dolorem suscipit quam modi in consequatur cupiditate error amet quibusdam?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias error necessitatibus
            est, ea maxime maiores fugiat similique alias quis deserunt? Dolorem suscipit quam modi
            in consequatur cupiditate error amet quibusdam?
          </p>
        </div>
        <ul className={styles.articles}>
          <li className={styles.article}>
            <a href="" className={styles.link}>
              text 1
            </a>
          </li>
          <li className={styles.article} data-anchor="article2">
            <a href="" className="link">
              work 1
            </a>
          </li>
          <li className={styles.article} data-anchor="article3">
            <a href="" className="link">
              text2
            </a>
          </li>
          <li className={styles.article} data-anchor="article4">
            <a href="" className="link">
              porro!
            </a>
          </li>
          <li className={styles.article} data-anchor="article5">
            <a href="" className="link">
              Lorem
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
