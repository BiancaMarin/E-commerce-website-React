import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Nav } from '../../components/Nav/Nav';
import styles from './ProductDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Footer } from '../../components/Footer/Footer';
import { Modal } from '../../components/Modal/Modal';
import { useAuthContext } from '../Auth/AuthContext';

export function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { user, accessToken } = useAuthContext();
  const [message, setMessage] = useState('');

  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3005/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (!product) {
    return <strong>Loading...</strong>;
  }

  async function handleAddWishlist() {
    const data = await fetch('http://localhost:3005/wishlist', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...product, userId: user.id }),
    }).then((res) => res.json());

    setMessage('The product was added successfully!');
  }
  async function handleAddCart() {
    const data = await fetch('http://localhost:3005/cart', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...product, userId: user.id }),
    }).then((res) => res.json());

    setMessage('The product was added successfully!');
  }

  return (
    <>
      <Nav />
      <section className={styles['product-details']}>
        <main className={styles['container']}>
          <div className={styles['image-container']}>
            <img
              className={styles['image']}
              src={product.poster}
              alt={`${product.title} Poster`}
            />
          </div>
          <article className={styles['details']}>
            <h2 className={styles['title']}>{product.title}</h2>
            <p>
              <FontAwesomeIcon
                className={styles['star']}
                icon={solid('star')}
              />{' '}
              <strong>{product.rating}</strong>
            </p>
            <p className={styles['price']}>
              <span className={styles['currency']}>{product.currency} </span>
              {product.price}
            </p>
            <p className={styles['material']}>
              <strong>Material type: </strong> {product.material}
            </p>
            <p className={styles['color']}>
              <strong>Color: </strong> {product.color}
            </p>
            <p className={styles['description']}>{product.description}</p>
            <div className={styles['btns']}>
              <button onClick={handleAddWishlist}>
                Add to wishlist
                <FontAwesomeIcon
                  icon={solid('heart')}
                  className={styles['heart']}
                />
              </button>
              <button onClick={handleAddCart}>
                Add to cart
                <FontAwesomeIcon
                  icon={solid('cart-shopping')}
                  className={styles['cart']}
                />
              </button>
              {user?.isAdmin && (
                <>
                  <Link to={`/products/edit/${product.id}`}>
                    <button>
                      Edit Item <FontAwesomeIcon icon={solid('pen')} />
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    Delete Item <FontAwesomeIcon icon={solid('trash')} />
                  </button>
                  {modal && <Modal closeModal={setModal} />}
                </>
              )}
            </div>
            {message && <p className={styles['message']}>{message}</p>}
          </article>
        </main>
      </section>
      <Footer />
    </>
  );
}
