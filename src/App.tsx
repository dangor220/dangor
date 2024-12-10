import './i18n/i18n';
import React, { useState } from 'react';
import useAnchorHandlers from './hooks/useAnchorHandlers';

import Background from './components/Background';
import Header from './components/Header';
import Preview from './components/Preview';
import About from './components/About';

import 'normalize.css';
import './scss/app.scss';

export default function App(): React.ReactNode {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);

  useAnchorHandlers(popup);

  return (
    <>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Preview menuIsOpen={menuIsOpen} />
      <About popup={popup} setPopup={setPopup} />
      <div id="skills" data-anchor>
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
      <div id="projects" data-anchor>
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
      <br />
      <br />
      <div id="contact" data-anchor>
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
