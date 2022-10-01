import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function ProductCard({ product, cart, setCart }) {
  return (
    <article className={styles['card']}>
      <Link to={`/productDetails/${product.id}`}>
        <img
          className={styles['image']}
          src={product.poster}
          alt={`${product.title} poster`}
        />
        <h2 className={styles['title']}>{product.title}</h2>
        <p className={styles['price']}>
          <span className={styles['currency']}>{product.currency}</span>
          {product.price}
        </p>
      </Link>
      <div>
        {cart.includes(product) ? (
          <button
            onClick={() => {
              setCart(cart.filter((c) => c.id !== product.id));
            }}
          >
            Remove from cart
            <FontAwesomeIcon
              icon={solid('cart-shopping')}
              className={styles['cart']}
            />
          </button>
        ) : (
          <button
            onClick={() => {
              setCart([...cart, product]);
            }}
          >
            Add to cart
            <FontAwesomeIcon
              icon={solid('cart-shopping')}
              className={styles['cart']}
            />
          </button>
        )}
      </div>
    </article>
  );
}
