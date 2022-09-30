import { useEffect, useState } from 'react';
import styles from './FilterByBrown.module.css';

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductCard } from '../Products/ProductCard';

export function FilterByColor() {
  const [products, setProducts] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/api/products?color=Brown')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  if (!products) {
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
          <button type="submit" className={styles['btn']}>
            <FontAwesomeIcon icon={solid('magnifying-glass')} />{' '}
          </button>
        </form>
      </div>
      <div className={styles['products-list']}>
        {products
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
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
}
