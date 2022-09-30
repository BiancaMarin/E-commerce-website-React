import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';
import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import { ProdCartComponent } from './ProdCartComponent';

export function Cart({ product }) {
  const [cartProducts, setCartProducts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/api/cart')
      .then((res) => res.json())
      .then((data) => setCartProducts(data));
  }, []);

  if (!cartProducts) {
    return <strong>Loading your wishlist products...</strong>;
  }

  return (
    <>
      <Nav />

      <div className={styles['products-cart']}>
        <h1>
          <FontAwesomeIcon
            className={styles['cart']}
            icon={solid('shopping-cart')}
          />
          {''}
          Your Shopping Cart
        </h1>
        {cartProducts.map((product) => (
          <ProdCartComponent key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </>
  );
}
