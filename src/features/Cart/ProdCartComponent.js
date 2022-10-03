import styles from './ProdCartComponent.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useContext } from 'react';
import { CartContext } from './CartContext';

export function ProdCartComponent({ product, setCart, cart }) {
  const [counter, setCounter] = useState(1);

  function handleClickIncrease() {
    setCounter(counter + 1);
  }
  function handleClickDecrease() {
    if (counter === 1) {
      setCounter(counter + 0);
    } else {
      setCounter(counter - 1);
    }
  }

  const subTotal = (counter * product.price).toFixed(2);

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
          {cart.includes(product) && (
            <button
              className={styles['remove-btn']}
              onClick={() => {
                setCart(cart.filter((c) => c.id !== product.id));
              }}
            >
              Remove from cart
              <FontAwesomeIcon
                icon={solid('trash')}
                className={styles['trash']}
              />
            </button>
          )}
          <p className={styles['subtotal']}>Subtotal: {subTotal}</p>
        </div>
      </div>
    </article>
  );
}
