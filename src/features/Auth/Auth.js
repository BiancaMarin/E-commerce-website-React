import React from 'react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import styles from './Auth.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Nav } from '../../components/Nav/Nav';
import { Footer } from '../../components/Footer/Footer';

export function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retype_password: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    gender: '',
    src: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retype_password: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    gender: '',
    serverError: '',
    src: '',
  });

  const { login, accessToken } = useAuthContext();

  const { pathname } = useLocation();
  const isRegister = pathname === '/register';

  if (accessToken) {
    return <Navigate to="/" />;
  }

  function handleInputChange(e) {
    setErrors({ ...errors, [e.target.name]: '' });
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = ValidateForm(values, isRegister);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    //Destructuring
    //Removing the retype_password from the data set which is sent to server.
    //Now all the dates which  will be sent to server are in dataForServer
    let { retype_password, ...dataForServer } = values;

    let apiPath = 'register';
    if (!isRegister) {
      dataForServer = {
        email: values.email,
        password: values.password,
      };
      apiPath = 'login';
    }

    const data = await fetch(`http://localhost:3005/api/${apiPath}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data });
      return;
    }

    login(data);
  }

  return (
    <>
      <Nav />
      <section className={styles['register']}>
        <h2>{isRegister ? 'Create an account' : 'Sign in'}</h2>

        <p className={styles['paragraph']}>
          {isRegister
            ? 'Please enter your details to create an account and be part of our great community.'
            : 'Please enter your detail to sign in our community.'}
        </p>
        {errors.serverError && (
          <p className={styles['email-existes']}>
            <FontAwesomeIcon icon={solid('circle-exclamation')} />{' '}
            {errors.serverError}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles['form']}>
            <div>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleInputChange}
                  placeholder="anna@preston.com"
                />
                {errors.email && (
                  <p className={styles['error']}>{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className={styles['error']}>{errors.password}</p>
                )}
              </div>
            </div>
            {isRegister && (
              <>
                <div>
                  <label htmlFor="retype_password">Retype Password</label>
                  <div>
                    <input
                      type="password"
                      name="retype_password"
                      id="retype_password"
                      value={values.retype_password}
                      onChange={handleInputChange}
                    />
                    {errors.retype_password && (
                      <p className={styles['error']}>
                        {errors.retype_password}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="firstName">First Name</label>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleInputChange}
                      placeholder="Anna"
                    />
                    {errors.firstName && (
                      <p className={styles['error']}>{errors.firstName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleInputChange}
                      placeholder="Preston"
                    />
                    {errors.lastName && (
                      <p className={styles['error']}>{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="country">Country</label>
                  <div>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={values.country}
                      onChange={handleInputChange}
                      placeholder="United Kingdom"
                    />
                    {errors.country && (
                      <p className={styles['error']}>{errors.country}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="city">City</label>
                  <div>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={values.city}
                      onChange={handleInputChange}
                      placeholder="London"
                    />
                    {errors.city && (
                      <p className={styles['error']}>{errors.city}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone">Phone number </label>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={values.phone}
                      onChange={handleInputChange}
                      placeholder="0039 065 897"
                    />
                    {errors.phone && (
                      <p className={styles['error']}>{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className={styles['gender']}>
                  <p className={styles['gender-label']}>Gender</p>
                  <div className={styles['gender-split']}>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="male">Male</label>

                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  {errors.gender && (
                    <p className={styles['error']}>{errors.gender}</p>
                  )}
                </div>

                <div className={styles['src']}>
                  <label htmlFor="src">Image Url</label>
                  <div>
                    <input
                      type="text"
                      name="src"
                      id="src"
                      value={values.src}
                      onChange={handleInputChange}
                    />
                    {errors.src && (
                      <p className={styles['error']}>{errors.src}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className={styles['register-btn']}>
              <p>
                <button> {isRegister ? 'Create an account' : 'Sign in'}</button>
              </p>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

function ValidateForm(values, isRegister) {
  const validation = {
    errors: {
      email: '',
      password: '',
      retype_password: '',
      phone: '',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      gender: '',
    },
    isValid: true,
  };

  /* eslint-disable no-control-regex*/
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  if (!values.email || !emailRegex.test(values.email)) {
    validation.isValid = false;
    validation.errors.email = 'Please enter a valid e-mail address.';
  }

  if (!values.password || values.password.length < 6) {
    validation.isValid = false;
    validation.errors.password =
      'Please enter a password that is at least 6 characters long.';
  }
  if (isRegister) {
    if (values.password !== values.retype_password) {
      validation.isValid = false;
      validation.errors.retype_password = 'The two passwords do not match.';
    }

    const phoneRegexExp = /^[0-9]{10}$/;
    if (!values.phone || !phoneRegexExp.test(values.phone)) {
      validation.isValid = false;
      validation.errors.phone = 'Please enter a valid phone number.';
    }

    if (!values.firstName) {
      validation.isValid = false;
      validation.errors.firstName = 'Please enter your first name.';
    }

    if (!values.lastName) {
      validation.isValid = false;
      validation.errors.lastName = 'Please enter your last name.';
    }

    if (!values.country) {
      validation.isValid = false;
      validation.errors.country = 'Please enter your country name.';
    }
    if (!values.city) {
      validation.isValid = false;
      validation.errors.city = 'Please enter your city name.';
    }

    if (!values.gender) {
      validation.isValid = false;
      validation.errors.gender = 'Please choose one type gender.';
    }
  }

  return validation;
}
