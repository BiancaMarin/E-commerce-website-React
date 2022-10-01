import { useEffect, useState } from 'react';
import styles from './FilterByColor.module.css';
import { ProductCard } from '../Products/ProductCard';

export function FilterByColor({ color, cart, setCart }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  if (!products) {
    return <strong>Loading products...</strong>;
  }

  return (
    <>
      <div className={styles['products-list']}>
        {products
          .filter((product) => {
            return product.color === color;
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
