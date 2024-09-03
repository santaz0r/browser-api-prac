import { createEvent, createStore, sample } from 'effector';
import { routes } from '../../app/routes/router';

export const currentRoute = routes.animate;
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

const $data = createStore<typeof images>(images);
const $lastChildId = createStore(images[images.length - 1].id);
const toggledElementVisible = createEvent<boolean>();
const $isElementVisible = createStore(false);

sample({
  clock: toggledElementVisible,
  target: $isElementVisible,
});

export const model = {
  toggledElementVisible,
  $isElementVisible,
  $data,
  $lastChildId,
};
