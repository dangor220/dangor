import './i18n/i18n';
import React, { useEffect, useState } from 'react';

import Background from './components/Background';
import Header from './components/Header';
import Preview from './components/Preview';
import About from './components/About';

import 'normalize.css';
import './scss/app.scss';

// TODO handler for mobile and scroll handler with change currentBlock

export default function App(): React.ReactNode {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [anchorChords, setAnchorChords] = useState<number[]>([]);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [anchorActive, setAnchorActive] = useState(false);

  useEffect(() => {
    const anchorData = [...document.querySelectorAll('[data-anchor]')];
    const anchorChords = anchorData.map((item) => item.getBoundingClientRect().top);
    const anchorChordsByScroll = anchorChords.map((item) => item + window.scrollY);

    const centerX = document.documentElement.clientWidth / 2;
    const centerY = document.documentElement.clientHeight / 2;

    const elem = document.elementFromPoint(centerX, centerY);

    if (elem) {
      const closest = anchorChords.reduce((prev, curr) => {
        const num = elem.getBoundingClientRect().top;
        return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev;
      });
      setCurrentBlock(anchorChords.indexOf(closest));
    }

    setAnchorChords(anchorChordsByScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: anchorChords[currentBlock],
      behavior: 'smooth',
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (anchorActive) return;
      if (event.key === 'ArrowDown' && currentBlock + 1 < anchorChords.length) {
        setAnchorActive(true);
        window.scrollTo({
          top: anchorChords[currentBlock + 1],
          behavior: 'smooth',
        });
        setCurrentBlock((prev) => prev + 1);

        setTimeout(() => setAnchorActive(false), 500);
      }
      if (event.key === 'ArrowUp' && currentBlock - 1 >= 0) {
        setAnchorActive(true);
        window.scrollTo({
          top: anchorChords[currentBlock - 1],
          behavior: 'smooth',
        });
        setCurrentBlock((prev) => prev - 1);
        setTimeout(() => setAnchorActive(false), 500);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (anchorActive) return;

      if (event.deltaY > 0 && currentBlock + 1 < anchorChords.length) {
        setAnchorActive(true);
        window.scrollTo({
          top: anchorChords[currentBlock + 1],
          behavior: 'smooth',
        });
        setCurrentBlock((prev) => prev + 1);

        setTimeout(() => setAnchorActive(false), 500);
      }
      if (event.deltaY < 0 && currentBlock - 1 >= 0) {
        setAnchorActive(true);
        window.scrollTo({
          top: anchorChords[currentBlock - 1],
          behavior: 'smooth',
        });
        setCurrentBlock((prev) => prev - 1);
        setTimeout(() => setAnchorActive(false), 500);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKey);
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('keyup', handleKey);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [currentBlock, anchorChords, anchorActive]);

  return (
    <>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Preview menuIsOpen={menuIsOpen} />
      <About />
      <div data-anchor="skills">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, numquam temporibus.
        Distinctio fugiat, unde ipsa sequi culpa sapiente cum rerum dignissimos minima repellendus
        quia? Quam, id! Iure velit est dicta! Suscipit perspiciatis dolore neque voluptate, repellat
        consequuntur modi voluptatum nobis totam a accusamus fugiat ullam tempora aliquid quasi.
        Iure dolores aliquid architecto odio quaerat at adipisci. Ad, odit! Asperiores, officia.
        Rerum officiis, fugit modi fugiat recusandae assumenda molestiae ipsam quod aut minus
        deleniti, nesciunt nemo maiores! Ut minus doloribus et consequatur, eos quam quo iure
        tempore, obcaecati fuga aliquam ea? Blanditiis voluptatem, ducimus dicta fugiat iste
        similique cupiditate eaque unde dolores molestias. Quis facilis possimus tempora excepturi
        totam est eaque vero placeat asperiores, tempore officia, doloribus veritatis architecto
        soluta obcaecati? Reprehenderit nisi incidunt inventore qui cumque deserunt excepturi
        praesentium est fugiat? Ex consequatur rem, ab voluptates, vero iure reprehenderit nobis
        asperiores odio ad, fugiat inventore qui facere id architecto alias. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Aspernatur, numquam temporibus. Distinctio fugiat, unde
        ipsa sequi culpa sapiente cum rerum dignissimos minima repellendus quia? Quam, id! Iure
        velit est dicta! Suscipit perspiciatis dolore neque voluptate, repellat consequuntur modi
        voluptatum nobis totam a accusamus fugiat ullam tempora aliquid quasi. Iure dolores aliquid
        architecto odio quaerat at adipisci. Ad, odit! Asperiores, officia. Rerum officiis, fugit
        modi fugiat recusandae assumenda molestiae ipsam quod aut minus deleniti, nesciunt nemo
        maiores! Ut minus doloribus et consequatur, eos quam quo iure tempore, obcaecati fuga
        aliquam ea? Blanditiis voluptatem, ducimus dicta fugiat iste similique cupiditate eaque unde
        dolores molestias. Quis facilis possimus tempora excepturi totam est eaque vero placeat
        asperiores, tempore officia, doloribus veritatis architecto soluta obcaecati? Reprehenderit
        nisi incidunt inventore qui cumque deserunt excepturi praesentium est fugiat? Ex consequatur
        rem, ab voluptates, vero iure reprehenderit nobis asperiores odio ad, fugiat inventore qui
        facere id architecto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aspernatur, numquam temporibus. Distinctio fugiat, unde ipsa sequi culpa sapiente cum rerum
        dignissimos minima repellendus quia? Quam, id! Iure velit est dicta! Suscipit perspiciatis
        dolore neque voluptate, repellat consequuntur modi voluptatum nobis totam a accusamus fugiat
        ullam tempora aliquid quasi. Iure dolores aliquid architecto odio quaerat at adipisci. Ad,
        odit! Asperiores, officia. Rerum officiis, fugit modi fugiat recusandae assumenda molestiae
        ipsam quod aut minus deleniti, nesciunt nemo maiores! Ut minus doloribus et consequatur, eos
        quam quo iure tempore, obcaecati fuga aliquam ea? Blanditiis voluptatem, ducimus dicta
        fugiat iste similique cupiditate eaque unde dolores molestias. Quis facilis possimus tempora
        excepturi totam est eaque vero placeat asperiores, tempore officia, doloribus veritatis
        architecto soluta obcaecati? Reprehenderit nisi incidunt inventore qui cumque deserunt
        excepturi praesentium est fugiat? Ex consequatur rem, ab voluptates, vero iure reprehenderit
        nobis asperiores odio ad, fugiat inventore qui facere id architecto alias. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Aspernatur, numquam temporibus. Distinctio fugiat,
        unde ipsa sequi culpa sapiente cum rerum dignissimos minima repellendus quia? Quam, id! Iure
        velit est dicta! Suscipit perspiciatis dolore neque voluptate, repellat consequuntur modi
        voluptatum nobis totam a accusamus fugiat ullam tempora aliquid quasi. Iure dolores aliquid
        architecto odio quaerat at adipisci. Ad, odit! Asperiores, officia. Rerum officiis, fugit
        modi fugiat recusandae assumenda molestiae ipsam quod aut minus deleniti, nesciunt nemo
        maiores! Ut minus doloribus et consequatur, eos quam quo iure tempore, obcaecati fuga
        aliquam ea? Blanditiis voluptatem, ducimus dicta fugiat iste similique cupiditate eaque unde
        dolores molestias. Quis facilis possimus tempora excepturi totam est eaque vero placeat
        asperiores, tempore officia, doloribus veritatis architecto soluta obcaecati? Reprehenderit
        nisi incidunt inventore qui cumque deserunt excepturi praesentium est fugiat? Ex consequatur
        rem, ab voluptates, vero iure reprehenderit nobis asperiores odio ad, fugiat inventore qui
        facere id architecto alias. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aspernatur, numquam temporibus. Distinctio fugiat, unde ipsa sequi culpa sapiente cum rerum
        dignissimos minima repellendus quia? Quam, id! Iure velit est dicta! Suscipit perspiciatis
        dolore neque voluptate, repellat consequuntur modi voluptatum nobis totam a accusamus fugiat
        ullam tempora aliquid quasi. Iure dolores aliquid architecto odio quaerat at adipisci. Ad,
        odit! Asperiores, officia. Rerum officiis, fugit modi fugiat recusandae assumenda molestiae
        ipsam quod aut minus deleniti, nesciunt nemo maiores! Ut minus doloribus et consequatur, eos
        quam quo iure tempore, obcaecati fuga aliquam ea? Blanditiis voluptatem, ducimus dicta
        fugiat iste similique cupiditate eaque unde dolores molestias. Quis facilis possimus tempora
        excepturi totam est eaque vero placeat asperiores, tempore officia, doloribus veritatis
        architecto soluta obcaecati? Reprehenderit nisi incidunt inventore qui cumque deserunt
        excepturi praesentium est fugiat? Ex consequatur rem, ab voluptates, vero iure reprehenderit
        nobis asperiores odio ad, fugiat inventore qui facere id architecto alias.
      </div>
      <br />
      <br />
      <div data-anchor="projects">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, numquam temporibus.
        Distinctio fugiat, unde ipsa sequi culpa sapiente cum rerum dignissimos minima repellendus
        quia? Quam, id! Iure velit est dicta! Suscipit perspiciatis dolore neque voluptate, repellat
        consequuntur modi voluptatum nobis totam a accusamus fugiat ullam tempora aliquid quasi.
        Iure dolores aliquid architecto odio quaerat at adipisci. Ad, odit! Asperiores, officia.
        Rerum officiis, fugit modi fugiat recusandae assumenda molestiae ipsam quod aut minus
        deleniti, nesciunt nemo maiores! Ut minus doloribusLorem ipsum dolor sit amet consectetur
        adipisicing elit. Aspernatur, numquam temporibus. Distinctio fugiat, unde ipsa sequi culpa
        sapiente cum rerum dignissimos minima repellendus quia? Quam, id! Iure velit est dicta!
        Suscipit perspiciatis dolore neque voluptate, repellat consequuntur modi voluptatum nobis
        totam a accusamus fugiat ullam tempora aliquid quasi. Iure dolores aliquid architecto odio
        quaerat at adipisci. Ad, odit! Asperiores, officia. Rerum officiis, fugit modi fugiat
        recusandae assumenda molestiae ipsam quod aut minus deleniti, nesciunt nemo maiores! Ut
        minus doloribus et consequatur, eos quam quo iure tempore, obcaecati fuga aliquam ea?
        Blanditiis voluptatem, ducimus dicta fugiat iste similique cupiditate eaque unde dolores
        molestias. Quis facilis possimus tempora excepturi totam est eaque vero placeat asperiores,
        tempore officia, doloribus veritatis architecto soluta obcaecati? Reprehenderit nisi
        incidunt inventore qui cumque deserunt excepturi praesentium est fugiat? Ex consequatur rem,
        ab voluptates, vero iure reprehenderit nobis asperiores odio ad, fugiat inventore qui facere
        id architecto alias.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
        numquam temporibus. Distinctio fugiat, unde ipsa sequi culpa sapiente cum rerum dignissimos
        minima repellendus quia? Quam, id! Iure velit est dicta! Suscipit perspiciatis dolore neque
        voluptate, repellat consequuntur modi voluptatum nobis totam a accusamus fugiat ullam
        tempora aliquid quasi. Iure dolores aliquid architecto odio quaerat at adipisci. Ad, odit!
        Asperiores, officia. Rerum officiis, fugit modi fugiat recusandae assumenda molestiae ipsam
        quod aut minus deleniti, nesciunt nemo maiores! Ut minus doloribus et consequatur, eos quam
        quo iure tempore, obcaecati fuga aliquam ea? Blanditiis voluptatem, ducimus dicta fugiat
        iste similique cupiditate eaque unde dolores molestias. Quis facilis possimus tempora
        excepturi totam est eaque vero placeat asperiores, tempore officia, doloribus veritatis
        architecto soluta obcaecati? Reprehenderit nisi incidunt inventore qui cumque deserunt
        excepturi praesentium est fugiat? Ex consequatur rem, ab voluptates, vero iure reprehenderit
        nobis asperiores odio ad, fugiat inventore qui facere id architecto alias.Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Aspernatur, numquam temporibus. Distinctio fugiat,
        unde ipsa sequi culpa sapiente cum rerum dignissimos minima repellendus quia? Quam, id! Iure
        velit est dicta! Suscipit perspiciatis dolore neque voluptate, repellat consequuntur modi
        voluptatum nobis totam a accusamus fugiat ullam tempora aliquid quasi. Iure dolores aliquid
        architecto odio quaerat at adipisci. Ad, odit! Asperiores, officia. Rerum officiis, fugit
        modi fugiat recusandae assumenda molestiae ipsam quod aut minus deleniti, nesciunt nemo
        maiores! Ut minus doloribus et consequatur, eos quam quo iure tempore, obcaecati fuga
        aliquam ea? Blanditiis voluptatem, ducimus dicta fugiat iste similique cupiditate eaque unde
        dolores molestias. Quis facilis possimus tempora excepturi totam est eaque vero placeat
        asperiores, tempore officia, doloribus veritatis architecto soluta obcaecati? Reprehenderit
        nisi incidunt inventore qui cumque deserunt excepturi praesentium est fugiat? Ex consequatur
        rem, ab voluptates, vero iure reprehenderit nobis asperiores odio ad, fugiat inventore qui
        facere id architecto alias.Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aspernatur, numquam temporibus. Distinctio fugiat, unde ipsa sequi culpa sapiente cum rerum
        dignissimos minima repellendus quia? Quam, id! Iure velit est dicta! Suscipit perspiciatis
        dolore neque voluptate, repellat consequuntur modi voluptatum nobis totam a accusamus fugiat
        ullam tempora aliquid quasi. Iure dolores aliquid architecto odio quaerat at adipisci. Ad,
        odit! Asperiores, officia. Rerum officiis, fugit modi fugiat recusandae assumenda molestiae
        ipsam quod aut minus deleniti, nesciunt nemo maiores! Ut minus doloribus et consequatur, eos
        quam quo iure tempore, obcaecati fuga aliquam ea? Blanditiis voluptatem, ducimus dicta
        fugiat iste similique cupiditate eaque unde dolores molestias. Quis facilis possimus tempora
        excepturi totam est eaque vero placeat asperiores, tempore officia, doloribus veritatis
        architecto soluta obcaecati? Reprehenderit nisi incidunt inventore qui cumque deserunt
        excepturi praesentium est fugiat? Ex consequatur rem, ab voluptates, vero iure reprehenderit
        nobis asperiores odio ad, fugiat inventore qui facere id architecto alias.Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Aspernatur, numquam temporibus. Distinctio fugiat,
        unde ipsa sequi culpa sapiente cum rerum dignissimos minima repellendus quia? Quam, id! Iure
        velit est dicta! Suscipit perspiciatis dolore neque voluptate, repellat consequuntur modi
        voluptatum nobis totam a accusamus fugiat ullam tempora aliquid quasi. Iure dolores aliquid
        architecto odio quaerat at adipisci. Ad, odit! Asperiores, officia. Rerum officiis, fugit
        modi fugiat recusandae assumenda molestiae ipsam quod aut minus deleniti, nesciunt nemo
        maiores! Ut minus doloribus et consequatur, eos quam quo iure tempore, obcaecati fuga
        aliquam ea? Blanditiis voluptatem, ducimus dicta fugiat iste similique cupiditate eaque unde
        dolores molestias. Quis facilis possimus tempora excepturi totam est eaque vero placeat
        asperiores, tempore officia, doloribus veritatis architecto soluta obcaecati? Reprehenderit
        nisi incidunt inventore qui cumque deserunt excepturi praesentium est fugiat? Ex consequatur
        rem, ab voluptates, vero iure reprehenderit nobis asperiores odio ad, fugiat inventore qui
        facere id architecto alias. et consequatur, eos quam quo iure tempore, obcaecati fuga
        aliquam ea? Blanditiis voluptatem, ducimus dicta fugiat iste similique cupiditate eaque unde
        dolores molestias. Quis facilis possimus tempora excepturi totam est eaque vero placeat
        asperiores, tempore officia, doloribus veritatis architecto soluta obcaecati? Reprehenderit
        nisi incidunt inventore qui cumque deserunt excepturi praesentium est fugiat? Ex consequatur
        rem, ab voluptates, vero iure reprehenderit nobis asperiores odio ad, fugiat inventore qui
        facere id architecto alias.
      </div>
      <Background />
    </>
  );
}
