import { useEffect, useState } from 'react';
import styles from './Clocks.module.css';
import { ProductCard } from '../../Products/ProductCard';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CartContext } from '../../Cart/CartContext';

export function Clocks() {
  const [productsClock, setProductsClock] = useState(null);
  const { cart, setCart } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/api/products?clocks=true')
      .then((res) => res.json())
      .then((data) => setProductsClock(data));
  }, []);
  if (!productsClock) {
    return <strong>Loading products...</strong>;
  }

  function handleSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
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
        {productsClock
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
    </>
  );
}
