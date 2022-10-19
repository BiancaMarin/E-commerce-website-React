import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './Trending.module.css';

export function Trending() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/api/products?trending=true')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!products) {
    return <strong>Loading trending products...</strong>;
  }

  function SampleNextArrow({ onClick }) {
    return (
      <div className={styles['arrow-right']} onClick={onClick}>
        <FontAwesomeIcon icon={solid('arrow-right')} />
      </div>
    );
  }

  function SamplePrevArrow(onClick) {
    return (
      <div className={styles['arrow-left']} onClick={onClick}>
        <FontAwesomeIcon icon={solid('arrow-left')} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={styles['trending']}>
      <h1>Trending</h1>
      <div className={styles['carousel']}>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id}>
              <div className={styles['card']}>
                <div className={styles['card-top']}>
                  <Link to={`/productDetails/${product.id}`}>
                    <img src={product.poster} alt={`${product.title} poster`} />
                    <h2 className={styles['title']}>{product.title}</h2>
                  </Link>
                </div>
                <div className={styles['card-bottom']}>
                  <p className={styles['price']}>
                    <span className={styles['currency']}>
                      {product.currency}
                    </span>
                    {product.price}
                  </p>
                  <button></button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })} */}
    </section>
  );
}
