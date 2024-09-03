import { createEffect, createStore } from 'effector';
import { routes } from '../../app/routes/router';
import goods from './data.json';

export const currentRoute = routes.cart;

type Cart = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

const $goods = createStore(goods);
const $cart = createStore<Cart[]>([]);

const addItemEffectFx = createEffect((item: Cart) => {
  const existingItems: Cart[] = JSON.parse(localStorage.getItem('cart') || '[]');
  existingItems.push(item);
  localStorage.setItem('cart', JSON.stringify(existingItems));
});

export const model = {
  $goods,
  $cart,
  addItemEffectFx,
};
