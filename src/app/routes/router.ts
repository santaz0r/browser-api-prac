import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';
import { appStarted } from './init';

export const routes = {
  home: createRoute(),
  scroll: createRoute(),
  animate: createRoute(),
  cart: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      route: routes.home,
      path: '/',
    },
    {
      route: routes.scroll,
      path: '/scroll',
    },
    {
      route: routes.animate,
      path: '/animate',
    },
    {
      route: routes.cart,
      path: '/cart',
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
