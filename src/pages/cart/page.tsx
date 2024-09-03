import { FC } from 'react';
import { Layout } from '../../shared/Layout/Layout';
import styles from './styles.module.scss';
import data from './data.json';

import { useSyncLocalStore } from '../../shared/lib/hooks/useSyncLocalStore';

type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  count?: number;
};

type Good = {
  good: Item;
  addToCart: (item: Item) => void;
};

type AddToCart = {
  addToCart: (item: Item) => void;
};

type Cart = {
  cart: Item[];
};

export const CartPage = () => {
  const { items, addItem } = useSyncLocalStore('cart');
  const addToCart = (item: Item) => {
    addItem(item);
  };
  return (
    <Layout>
      <h1>Cart page</h1>
      <div className={styles.wrapper}>
        <GoodsView addToCart={addToCart} />
        <CartView cart={items} />
      </div>
    </Layout>
  );
};

const GoodsView: FC<AddToCart> = ({ addToCart }) => {
  return (
    <div className={styles.goods}>
      <h2>Goods</h2>
      <div>
        {data.map((i) => (
          <GoodItem key={i.id} good={i} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

const GoodItem: FC<Good> = ({ good, addToCart }) => {
  const { description, id, price, thumbnail, title } = good;
  return (
    <div className={styles.good}>
      <h2>{`${id} ${title}`}</h2>
      <div>{description}</div>
      <div>{price}</div>
      <img src={thumbnail} alt={title} />
      <button onClick={() => addToCart(good)}>добавить в корзину</button>
    </div>
  );
};

const CartView: FC<Cart> = ({ cart }) => {
  return (
    <div className={styles.cart}>
      <h2>Cart</h2>
      <div>
        {cart.map((i) => (
          <div className={styles.items} key={i.id}>
            <h2>{`${i.id} ${i.title}`}</h2>
            <div>{i.description}</div>
            <div>Количество: {i.count}</div>
            <div>{i.price}</div>
            <img src={i.thumbnail} alt={i.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
