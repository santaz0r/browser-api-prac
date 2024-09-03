import { createRoutesView } from 'atomic-router-react';
import { HomePageRoute } from './home-page';
import { ScrollPageRoute } from './scroll';
import { AnimateRoute } from './animate';
import { CartPageRoute } from './cart';

export const Pages = createRoutesView({
  routes: [HomePageRoute, ScrollPageRoute, AnimateRoute, CartPageRoute],
});
