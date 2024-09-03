import { createEffect } from 'effector';

export const getPostsFx = createEffect(async (page: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=7&_page=${page}`);

  const data = await res.json();
  return data;
});

export type Post = {
  id: string;
  title: string;
  body: string;
};

export const getAllPosts = async (page: number): Promise<Post[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=7&_page=${page}`);

  const data = await res.json();
  return data;
};
