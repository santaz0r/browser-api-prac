import { createEffect, createEvent, createStore, sample } from 'effector';
import { routes } from '../../app/routes/router';
import { Post } from '../../shared/api';

export const currentRoute = routes.scroll;

const $currentPage = createStore<number>(0); // сменил на 0, т.к. при запуске приложения запрос происходил на 2 страницу
const $posts = createStore<Post[]>([]);

const getPosts = createEvent();

const getPostsFx = createEffect(async (page: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=7&_page=${page}`);

  const data = await res.json();
  return data;
});

sample({
  clock: getPosts,
  source: $currentPage,
  fn: (page) => page + 1,
  target: getPostsFx,
});

sample({
  clock: getPostsFx.doneData,
  source: $posts,
  fn: (oldPosts, newPosts) => [...oldPosts, ...newPosts],
  target: $posts,
});

sample({
  clock: $posts,
  fn: (posts) => posts.length / 7,
  target: $currentPage,
});

export const model = {
  $currentPage,
  $posts,
  getPostsFx,
  getPosts,
};
