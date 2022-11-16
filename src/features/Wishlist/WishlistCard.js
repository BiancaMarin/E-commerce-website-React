import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './WishlistCard.module.css';
import { useAuthContext } from '../Auth/AuthContext';

export function WishlistCard({ product }) {
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);

  async function handleRemoveWishlist() {
    await fetch(`http://localhost:3005/api/wishlist/${product.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    navigate('/products');
  }
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
      <div className={styles['btns']}>
        {cart.includes(product) ? (
          <button
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
        <button onClick={handleRemoveWishlist}>
          Remove from wishlist
          <FontAwesomeIcon icon={solid('trash')} className={styles['trash']} />
        </button>
      </div>
    </article>
  );
}
