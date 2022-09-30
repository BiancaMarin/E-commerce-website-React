import { Link, useNavigate } from 'react-router-dom';
import styles from './WishProductCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useAuthContext } from '../Auth/AuthContext';
import { useState } from 'react';

export function WishProductCard({ product }) {
  const navigate = useNavigate();
  const { accessToken, user } = useAuthContext();
  const [message, setMessage] = useState('');

  async function handleRemoveWishlist() {
    await fetch(`http://localhost:3005/api/wishlist/${product.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    navigate('/products');
  }

  async function handleAddToCart() {
    const data = await fetch('http://localhost:3005/cart', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...product, userId: user.id }),
    }).then((res) => res.json());

    setMessage('The product was added successfully!');
  }

  return (
    <article className={styles['card']}>
      {message && <p className={styles['message']}>{message}</p>}
      <Link to={`/productDetails/${product.id}`}>
        <img
          className={styles['product-image']}
          src={product.poster}
          alt={`${product.title} poster`}
        />
        <h2 className={styles['title']}>{product.title}</h2>
        <p className={styles['price']}>
          <span className={styles['currency']}>{product.currency}</span>
          {product.price}
        </p>
      </Link>
      <div className={styles['btns']}>
        <button onClick={handleRemoveWishlist} className={styles['trash-btn']}>
          Remove from wishlist
          <FontAwesomeIcon icon={solid('trash')} className={styles['trash']} />
        </button>
        <button onClick={handleAddToCart} className={styles['cart-btn']}>
          Add to cart
          <FontAwesomeIcon
            icon={solid('shopping-cart')}
            className={styles['cart']}
          />
        </button>
      </div>
    </article>
  );
}
