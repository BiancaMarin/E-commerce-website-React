import { useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './Contact.module.css';

export function Contact() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userMessage: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userMessage: '',
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

    const data = await fetch('http://localhost:3005/messages', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, userId: user.id }),
    }).then((res) => res.json());

    setMessage('Your message was succesfully sent!');
  }

  return (
    <>
      <Nav />
      <main>
        <section className={styles['contact']}>
          <h1>
            <FontAwesomeIcon
              className={styles['envelope']}
              icon={solid('envelope')}
            />
            Get in touch
          </h1>
          {message && <p className={styles['received']}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles['grid']}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleInputChange}
                    value={values.firstName}
                    placeholder="Anna"
                  />
                </div>
                {errors.firstName && (
                  <p className={styles['error']}>{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleInputChange}
                    value={values.lastName}
                    placeholder="Preston"
                  />
                </div>
                {errors.lastName && (
                  <p className={styles['error']}>{errors.lastName}</p>
                )}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    value={values.email}
                    placeholder="anna@preston.com"
                  />
                </div>
                {errors.email && (
                  <p className={styles['error']}>{errors.email}</p>
                )}
              </div>

              <div className={styles['textarea']}>
                <label htmlFor="userMessage">Message</label>
                <div>
                  <textarea
                    name="userMessage"
                    id="userMessage"
                    cols="30"
                    rows="10"
                    placeholder="Please type your message here..."
                    onChange={handleInputChange}
                    value={values.userMessage}
                  ></textarea>
                </div>
                {errors.userMessage && (
                  <p className={styles['error']}>{errors.userMessage}</p>
                )}
              </div>
              <div className={styles['btn']}>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </section>
        <section className={styles['store-location']}>
          <div>
            <h3 className={styles['subtitle']}>Call Us</h3>
            <p className={styles['text']}>
              <FontAwesomeIcon
                icon={solid('phone')}
                className={styles['phone-icon']}
              />
              00 39 456 345
            </p>
          </div>
          <div>
            <h3 className={styles['subtitle']}>Visit Us</h3>
            <p className={styles['text']}>
              <FontAwesomeIcon
                icon={solid('location-dot')}
                className={styles['location-icon']}
              />
              13 Decembrie Street, Brasov Romania
            </p>
          </div>
          <div className={styles['map']}>
            <iframe
              className={styles['map-sizes']}
              src="https://maps.google.com/maps?q=13%20decembrie%20brasov&t=&z=13&ie=UTF8&iwloc=&output=embed"
              title="adress"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ValidateForm(values) {
  const validation = {
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      userMessage: '',
    },
    isValid: true,
  };

  if (!values.email) {
    validation.isValid = false;
    validation.errors.email = 'Please enter a valid email address.';
  }
  if (!values.firstName) {
    validation.isValid = false;
    validation.errors.firstName = 'Please enter your first name.';
    console.log(validation.errors.firstName);
  }
  if (!values.lastName) {
    validation.isValid = false;
    validation.errors.lastName = 'Please enter your last name.';
  }
  if (!values.userMessage) {
    validation.isValid = false;
    validation.errors.userMessage = 'Please enter your message.';
  }

  return validation;
}
