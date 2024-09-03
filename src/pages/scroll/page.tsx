import { Layout } from '../../shared/Layout/Layout';
import styles from './styles.module.scss';
import { useInfiniteScroll } from '../../shared/lib/hooks/useInfiniteScroll';
import { useCountBlocks } from '../../shared/lib/hooks/useCountBlocks';
import { model } from './model';
import { useUnit } from 'effector-react';

export const Scroll = () => {
  return (
    <Layout>
      <h1>Scroll</h1>
      <PostsView />
    </Layout>
  );
};

const PostsView = () => {
  const [getPosts, posts] = useUnit([model.getPosts, model.$posts]);
  const { targetRef } = useInfiniteScroll({
    opt: {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    },
    cb: getPosts,
  });
  const { addRef, visibleCount } = useCountBlocks({ opt: { threshold: 0.5 } });

  return (
    <>
      <h1 className={styles.count_blocks}>Количество пройденных блоков: {visibleCount}</h1>
      {posts.map((item) => {
        return (
          <div key={item.id} className={styles.post} ref={addRef}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        );
      })}
      <div ref={targetRef} style={{ height: '20px', background: 'transparent' }} />
    </>
  );
};
