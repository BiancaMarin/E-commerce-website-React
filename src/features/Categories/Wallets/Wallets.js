import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../Cart/CartContext';
import { ProductCard } from '../../Products/ProductCard';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Wallets.module.css';

export function Wallets() {
  const { cart, setCart } = useContext(CartContext);

  const [productsWallet, setProductsWallet] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/api/products?wallets=true')
      .then((res) => res.json())
      .then((data) => setProductsWallet(data));
  }, []);
  if (!productsWallet) {
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
        {productsWallet
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
