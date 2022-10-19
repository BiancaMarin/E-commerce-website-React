import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ProductCard } from '../Products/ProductCard';
import { CartContext } from '../Cart/CartContext';
import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './Wishlist.module.css';

export function Wishlist() {
  const { cart, setCart } = useContext(CartContext);
  const [wishProducts, setWishProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/api/wishlist')
      .then((res) => res.json())
      .then((data) => setWishProducts(data));
  }, []);

  if (!wishProducts) {
    return <strong>Loading your wishlist products...</strong>;
  }

  function handleSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <Nav />
      <h3 className={styles['wishlist-title']}>
        <FontAwesomeIcon className={styles['heart']} icon={solid('heart')} />
        {''}
        Your Wishlist
      </h3>
      <div className={styles['search-bar']}>
        <form>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="Search..."
            onChange={handleSearchTerm}
          />
          <FontAwesomeIcon
            icon={solid('magnifying-glass')}
            className={styles['search-icon']}
          />{' '}
        </form>
      </div>
      <div className={styles['products-list']}>
        {wishProducts
          .filter((product) => {
            if (searchTerm === '') {
              return product;
            } else if (
              product.title
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return product;
            }
          })
          .map((product) => (
            <ProductCard
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
