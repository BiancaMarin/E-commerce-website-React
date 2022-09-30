import { useEffect, useState } from 'react';
import { WishProductCard } from './WishProductCard';
import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';
import styles from './Wishlist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function Wishlist() {
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
      <div className={styles['search-bar']}>
        <form>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="Search..."
            onChange={handleSearchTerm}
          />
          <button type="submit" className={styles['btn']}>
            <FontAwesomeIcon icon={solid('magnifying-glass')} />{' '}
          </button>
        </form>
      </div>
      <div className={styles['products-list']}>
        <h3>
          <FontAwesomeIcon className={styles['heart']} icon={solid('heart')} />
          {''}
          Your Wishlist
        </h3>
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
            <WishProductCard key={product.id} product={product} />
          ))}
      </div>
      <Footer />
    </>
  );
}
