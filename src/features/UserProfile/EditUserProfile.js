import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Nav } from '../../components/Nav/Nav';
import { Footer } from '../../components/Footer/Footer';
import styles from './EditUserProfile.module.css';

export function EditUserProfile() {
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
  });

  const { userId } = useParams();
  const { accessToken, user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3005/users/' + userId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setValues(data));
  }, [userId, accessToken]);

  const [message, setMessage] = useState('');

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

    //Destructuring
    //Removing the retype_password from the data set which is sent to server.
    //Now all the dates which  will be sent to server are in dataForServer

    const data = await fetch('http://localhost:3005/users/' + values.id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setErrors({ ...errors, serverError: data });
      return;
    }

    setMessage('Your account was updated successfully');
  }

  return (
    <>
      <Nav />
      <section className={styles['user-account']}>
        <h2 className={styles['subtitle']}>Hello Dear {user.firstName}</h2>

        <form className={styles['form']} onSubmit={handleSubmit}>
          {message && <p className={styles['updated']}>{message}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleInputChange}
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
                <p className={styles['error']}>{errors.retype_password}</p>
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
              />
              {errors.lastName && (
                <p className={styles['error']}>{errors.lastName}</p>
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
                checked={values.gender === 'male'}
                onChange={handleInputChange}
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={values.gender === 'female'}
                onChange={handleInputChange}
              />
              <label htmlFor="female">Female</label>
            </div>
            {errors.gender && (
              <p className={styles['error']}>{errors.gender}</p>
            )}
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
              />
              {errors.city && <p className={styles['error']}>{errors.city}</p>}
            </div>
          </div>
          <div className={styles['btns']}>
            <button>
              Edit Account{' '}
              <FontAwesomeIcon className={styles['edit']} icon={solid('pen')} />
            </button>
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

  if (values.password !== values.retype_password) {
    validation.isValid = false;
    validation.errors.retype_password = 'The two passwords do not match.';
  }

  const phoneRegex = /^\d{13}$/i;
  if (!values.phone || phoneRegex.test(values.phone)) {
    validation.isValid = false;
    validation.errors.phone =
      'The phone number must be a valid roumanian telephone number (13 digits).';
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

  return validation;
}
