import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
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
    </article>
  );
}
