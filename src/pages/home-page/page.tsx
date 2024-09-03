import { FC } from 'react';
import { Layout } from '../../shared/Layout/Layout';

import styles from './styles.module.scss';
import { useLazyImageObserver } from '../../shared/lib/hooks/useLazyImageObserver';

const images = [
  {
    id: '1',
    title: 'Cat loves',
    url: 'https://sun9-78.userapi.com/impg/RIQuFZJPvtIjDH3kncfk1RVG4CXqMFBGOpPrSg/3WpTOf2nVf4.jpg?size=642x794&quality=96&sign=9750ca969340a2b1dc1a8f2c1c4f4104&type=album',
  },

  {
    id: '2',
    title: 'Angry',
    url: 'https://sun9-54.userapi.com/impg/CV9ZHXamANcii6f871VienRi2dMcP9KvP-3xzg/KKOCrjzpQv0.jpg?size=360x503&quality=96&sign=58fc97b5648d3de7f3c42847ba2358e8&type=album',
  },

  {
    id: '3',
    title: 'Wut cat',
    url: 'https://sun9-66.userapi.com/impg/-ipSDkTRyTlXjBYADZv_fgs5FTEz_Mx1OJWlbg/oT94ISDqU24.jpg?size=225x225&quality=96&sign=898e214755ff734bb2fa53c33a70994c&type=album',
  },
];

export const HomePage = () => {
  return (
    <Layout>
      <h1>HomePage</h1>
      <div className={styles.content}>Другой контент который занимает много места</div>
      {images.map((i) => (
        <ImageView key={i.id} {...i} />
      ))}
    </Layout>
  );
};

type Image = {
  id: string;
  title: string;
  url: string;
};

const ImageView: FC<Image> = (image) => {
  const { title, url } = image;
  const ref = useLazyImageObserver({
    root: null,
    rootMargin: '50px',
  });

  return (
    <section className={styles.image_section}>
      <h2>{title}</h2>
      <div className={styles.image}>
        <img ref={ref} alt={title} data-src={url} />
      </div>
    </section>
  );
};
