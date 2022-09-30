import styles from './ProdCartComponent.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function ProdCartComponent({ product }) {
  const [counter, setCounter] = useState(0);
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();

  function handleClickIncrease() {
    setCounter(counter + 1);
  }

  function handleClickDecrease() {
    setCounter(counter - 1);
  }

  if (counter === 0) {
    setCounter(counter + 1);
  }

  async function handleClickRemove() {
    await fetch(`http://localhost:3005/api/cart/${product.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    navigate('/products');
  }

  const total = (counter * product.price).toFixed(2);
  console.log(total);

  return (
    <article className={styles['card']}>
      <Link to={`/productDetails/${product.id}`}>
        <img
          className={styles['image']}
          src={product.poster}
          alt={`${product.title} poster`}
        />
      </Link>
      <div>
        <h2 className={styles['title']}>{product.title}</h2>
        <p className={styles['price']}>
          <span className={styles['currency']}>{product.currency}</span>
          {product.price}
        </p>

        <button onClick={handleClickDecrease}>-</button>
        <output className={styles['output']}>{counter}</output>
        <button onClick={handleClickIncrease}>+</button>
        <div>
          <button className={styles['remove-btn']} onClick={handleClickRemove}>
            Remove from cart
            <FontAwesomeIcon
              icon={solid('trash')}
              className={styles['trash']}
            />
          </button>
          <p className={styles['subtotal']}>
            Subtotal: {total} {product.currency}{' '}
          </p>
        </div>
      </div>
    </article>
  );
}
