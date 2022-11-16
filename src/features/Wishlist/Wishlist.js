import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';
import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './Wishlist.module.css';
import { WishlistCard } from './WishlistCard';
import { useAuthContext } from '../Auth/AuthContext';

export function Wishlist() {
  const { user } = useAuthContext();
  const { cart, setCart } = useContext(CartContext);
  const [wishProducts, setWishProducts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/api/wishlist/')
      .then((res) => res.json())
      .then((data) => setWishProducts(data));
  }, []);

  if (!wishProducts) {
    return <strong>Loading your wishlist products...</strong>;
  }

  return (
    <>
      <Nav />
      <h3 className={styles['wishlist-title']}>
        <FontAwesomeIcon className={styles['heart']} icon={solid('heart')} />
        {''}
        Your Wishlist
      </h3>

      <div className={styles['products-list']}>
        {user && (
          <>
            {wishProducts.map((product) => (
              <WishlistCard
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
