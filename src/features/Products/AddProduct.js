import { useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Nav } from '../../components/Nav/Nav';
import { Footer } from '../../components/Footer/Footer';
import styles from './AddProduct.module.css';

export function AddProduct() {
  const [values, setValues] = useState({
    title: '',
    poster: '',
    color: '',
    price: '',
    currency: '',
    material: '',
    rating: 0,
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    poster: '',
    color: '',
    price: '',
    currency: '',
    material: '',
    rating: 0,
    description: '',
  });

  const [message, setMessage] = useState('');
  const { accessToken, user } = useAuthContext();

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = ValidateForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const data = await fetch('http://localhost:3005/products', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, userId: user.id }),
    }).then((res) => res.json());

    setMessage('The item product was added successfully!');
  }

  return (
    <>
      <Nav />
      <section className={styles['add-product']}>
        <h3>
          <FontAwesomeIcon
            icon={solid('square-plus')}
            className={styles['add-icon']}
          />
          Add product
        </h3>
        <form onSubmit={handleSubmit}>
          {message && <p className={styles['added']}>{message}</p>}
          <div className={styles['grid']}>
            <div>
              <label htmlFor="title">Title</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={values.title}
                  onChange={handleInputChange}
                />
                {errors.title && (
                  <p className={styles['error']}>{errors.title}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="poster">Poster</label>
              <div>
                <input
                  type="text"
                  name="poster"
                  id="poster"
                  value={values.poster}
                  onChange={handleInputChange}
                />
                {errors.poster && (
                  <p className={styles['error']}>{errors.poster}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="color">Colour</label>
              <div>
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={values.color}
                  onChange={handleInputChange}
                />
                {errors.color && (
                  <p className={styles['error']}>{errors.color}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={values.price}
                  onChange={handleInputChange}
                />
                {errors.price && (
                  <p className={styles['error']}>{errors.price}</p>
                )}
              </div>
            </div>

            <div className={styles['currency']}>
              <p>Currency</p>

              <input
                type="radio"
                name="currency"
                id="usd"
                value="USD"
                onChange={handleInputChange}
              />
              <label htmlFor="usd">USD</label>

              <input
                type="radio"
                name="currency"
                id="eur"
                value="EUR"
                onChange={handleInputChange}
              />
              <label htmlFor="eur">EUR</label>
              {errors.currency && (
                <p className={styles['error']}>{errors.currency}</p>
              )}
            </div>

            <div>
              <label htmlFor="material">Material</label>
              <div>
                <input
                  type="text"
                  name="material"
                  id="material"
                  value={values.material}
                  onChange={handleInputChange}
                />
                {errors.material && (
                  <p className={styles['error']}>{errors.material}</p>
                )}
              </div>
            </div>

            <div className={styles['rating']}>
              <label htmlFor="rating">Rating</label>
              <div>
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="1"
                  max="10"
                  step="0.1"
                  value={values.rating}
                  onChange={handleInputChange}
                />
                <p className={styles['rating-value']}>
                  Rating: {values.rating}
                </p>
                {errors.rating && (
                  <p className={styles['error']}>{errors.rating}</p>
                )}
              </div>
            </div>

            <div className={styles['textarea']}>
              <label htmlFor="description">Description</label>
              <div>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  value={values.description}
                  onChange={handleInputChange}
                ></textarea>
                {errors.description && (
                  <p className={styles['error']}>{errors.description}</p>
                )}
              </div>
            </div>
            <div className={styles['btn']}>
              <button>Add</button>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

function ValidateForm(values) {
  const validation = {
    errors: {
      title: '',
      poster: '',
      price: '',
      color: '',
      material: '',
      rating: '',
      currency: '',
      description: '',
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex*/

  if (!values.title) {
    validation.isValid = false;
    validation.errors.title = 'Please enter a title product.';
  }

  if (!values.poster) {
    validation.isValid = false;
    validation.errors.poster = 'Please enter a URL poster.';
  }

  if (!values.price) {
    validation.isValid = false;
    validation.errors.price = 'Please enter a price product.';
  }

  if (!values.color) {
    validation.isValid = false;
    validation.errors.color = 'Please specify a color product.';
  }

  if (!values.material) {
    validation.isValid = false;
    validation.errors.material = 'Please specify a material product.';
  }

  if (!values.rating) {
    validation.isValid = false;
    validation.errors.rating = 'Please rate the product from 0 to 10.';
  }

  if (!values.currency) {
    validation.isValid = false;
    validation.errors.currency = 'Please choose a currency.';
  }

  if (values.gender === 'G') {
    validation.isValid = false;
    validation.errors.gender = 'Please choose a gender product.';
  }

  if (values.size === 'size') {
    validation.isValid = false;
    validation.errors.size = 'Please choose a size product.';
  }

  if (!values.description) {
    validation.isValid = false;
    validation.errors.description = 'Please choose a description product.';
  }

  return validation;
}
