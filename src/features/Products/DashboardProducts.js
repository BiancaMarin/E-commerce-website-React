import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';
import styles from './DashboardProducts.module.css';
import { Link } from 'react-router-dom';
import { ProductsList } from './ProductsList';
import { Bags } from '../Categories/Bags/Bags';
import { Clocks } from '../Categories/Clocks/Clocks';
import { Wallets } from '../Categories/Wallets/Wallets';
import { FilterByColor } from '../FilterByColor/FilterByColor';
import { useAuthContext } from '../Auth/AuthContext';
import { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';

export function DashboardProducts() {
  const [products, setProducts] = useState(null);

  const [active, setActive] = useState('ProductsList');
  const { user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3005/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!products) {
    return <strong>Loading products...</strong>;
  }

  return (
    <>
      <Nav />

      <section className={styles['products-page']}>
        <div className={styles['dashboard']}>
          <section className={styles['products']}>
            <h3>Products</h3>
            <div className={styles['btns']}>
              <button on onClick={() => setActive('ProductsList')}>
                Products list
              </button>
              {user?.isAdmin && (
                <>
                  <Link to="/products/add/">
                    <button onClick={() => setActive('AddProduct')}>
                      Add product
                    </button>
                  </Link>
                </>
              )}
            </div>
          </section>

          <section className={styles['categories']}>
            <h3>Categories</h3>
            <div className={styles['btns']}>
              <button on onClick={() => setActive('Bags')}>
                Bags
              </button>
              <button onClick={() => setActive('Wallets')}>Wallets</button>
              <button onClick={() => setActive('Clocks')}>Clocks</button>
            </div>
          </section>
          <section className={styles['filter']}>
            <h3>Filter by</h3>
            <div className={styles['filter-color']}>
              <FontAwesomeIcon
                onClick={() => setActive('Brown')}
                icon={solid('square')}
                className={styles['brown']}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['black']}
                onClick={() => setActive('Black')}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['yellow']}
                onClick={() => setActive('Yellow')}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['blue']}
                onClick={() => setActive('Blue')}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['pink']}
                onClick={() => setActive('Pink')}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['white']}
                onClick={() => setActive('White')}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['red']}
                onClick={() => setActive('Red')}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['turquoise']}
                onClick={() => setActive('Turquoise')}
              />
              <FontAwesomeIcon
                icon={solid('square')}
                className={styles['orange']}
                onClick={() => setActive('Orange')}
              />
            </div>
          </section>
        </div>
        <h1 className={styles['title']}>
          {' '}
          <FontAwesomeIcon
            className={styles['toolbox']}
            icon={solid('table-cells')}
          />
          Products grid
        </h1>

        <div className={styles['products-list']}>
          {active === 'ProductsList' && <ProductsList />}
          {active === 'Clocks' && <Clocks />}
          {active === 'Bags' && <Bags />}
          {active === 'Wallets' && <Wallets />}

          <FilterByColor color={active} />
        </div>
      </section>
      <Footer />
    </>
  );
}
