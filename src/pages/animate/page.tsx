import { Layout } from '../../shared/Layout/Layout';

import styles from './styles.module.scss';
import { useLastAnimation } from '../../shared/lib/hooks/useLastAnimation';
import { model } from './model';
import { useList, useUnit } from 'effector-react';

export const Animate = () => {
  return (
    <Layout>
      <h1>Last animate</h1>

      <ImagesView />
    </Layout>
  );
};

const ImagesView = () => {
  const [toggle, isVisisble, lastChildId, data] = useUnit([
    model.toggledElementVisible,
    model.$isElementVisible,
    model.$lastChildId,
    model.$data,
  ]);

  const ref = useLastAnimation({ toggledVisible: toggle, opt: { threshold: 0.5 } });

  const elementClass = isVisisble ? styles.animated : '';

  return (
    <>
      {data.map((i) => {
        const isLastChild = lastChildId === i.id;

        return (
          <section
            className={`${styles.image_section} ${isLastChild ? elementClass : ''}`}
            ref={isLastChild ? ref : null}
            key={i.id}
          >
            <h2>{i.title}</h2>
            <div className={styles.image}>
              <img alt={i.title} src={i.url} />
            </div>
          </section>
        );
      })}
    </>
  );
};

// const ImagesView2 = () => {
//   const { toggledElementVisible, $isElementVisible, $data, $lastChildId } = model;
//   const [toggle, isVisisble, lastChildId] = useUnit([toggledElementVisible, $isElementVisible, $lastChildId]);

//   const ref = useLastAnimation({ toggledVisible: toggle, opt: { threshold: 0.5 } });

//   const elementClass = isVisisble ? styles.animated : 'no class';

//   const results = useList($data, {
//     getKey: (i) => i.id,
//     fn: (i) => {
//       const isLast = String(lastChildId) === i.id;
//       return (
//         <section className={`${styles.image_section} ${isLast ? elementClass : ''}`} ref={isLast ? ref : null} key={i.id}>
//           <h2>{i.title}</h2>
//           <div className={styles.image}>
//             <img alt={i.title} src={i.url} />
//           </div>
//         </section>
//       );
//     },
//   });
//   return <>{results}</>;
// };
