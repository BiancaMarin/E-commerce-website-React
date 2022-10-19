import { useContext } from 'react';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ProdCartComponent } from './ProdCartComponent';
import { Nav } from '../../components/Nav/Nav';
import { Footer } from '../../components/Footer/Footer';
import styles from './Cart.module.css';

export function Cart() {
  const { cart, setCart } = useContext(CartContext);

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
      </div>

      <div>
        {cart.length === 0 && (
          <>
            <div className={styles['empty']}>Your cart is empty.</div>
          </>
        )}
        {cart.map((product) => (
          <ProdCartComponent
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}
