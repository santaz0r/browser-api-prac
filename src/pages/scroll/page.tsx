import { FC, useCallback, useState } from 'react';
import { Layout } from '../../shared/Layout/Layout';
import { getAllPosts, Post } from '../../shared/api';

import styles from './styles.module.scss';
import { useInfiniteScroll } from '../../shared/lib/hooks/useInfiniteScroll';
import { useCountBlocks } from '../../shared/lib/hooks/useCountBlocks';
import { model } from './model';
import { useUnit } from 'effector-react';

export const Scroll = () => {
  // const getPosts = useCallback(async () => {
  //   const newPosts = await getAllPosts(currentPage);
  // setPosts((prev) => [...prev, ...newPosts]);
  //   setCurrentPage((prev) => prev + 1);
  // }, [currentPage]);

  return (
    <Layout>
      <h1>Scroll</h1>
      {<PostsView />}
    </Layout>
  );
};

// type Porps = {
//   // items: Post[];
//   // fetch: () => Promise<void>;
// };

const PostsView = () => {
  const [getPosts, posts] = useUnit([model.getPosts, model.$posts]);
  const { isLoading, targetRef } = useInfiniteScroll({
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
      {isLoading && <h3 style={{ height: '40px', background: 'red' }}>Loading posts...</h3>}
      <div ref={targetRef} style={{ height: '20px', background: 'transparent' }} />
    </>
  );
};

// const [isLoading, setIsLoading] = useState(false);
// const loaderRef = useRef<HTMLDivElement>(null);
// useEffect(() => {
//   const node = loaderRef.current;
//   const observerCallback: IntersectionObserverCallback = ([entry]) => {
//     if (entry.isIntersecting && !isLoading) {
//       setIsLoading(true);
//       fetch().finally(() => setIsLoading(false));
//     }
//   };
//   const observer = new IntersectionObserver(observerCallback, {
// root: null,
// rootMargin: '20px',
// threshold: 1.0,
//   });
//   if (node) {
//     observer.observe(node);
//   }
//   return () => {
//     if (node) {
//       observer.unobserve(node);
//     }
//   };
// }, [fetch, isLoading]);
