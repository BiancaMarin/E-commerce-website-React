import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <section className={styles['footer']}>
      <div className={styles['logo']}>
        <NavLink to="/">
          <FontAwesomeIcon
            icon={solid('bag-shopping')}
            className={styles['logo-bag']}
          />
          O bag
        </NavLink>
        <p className={styles['copyright']}>
          <FontAwesomeIcon
            icon={solid('copyright')}
            className={styles['copyright-icon']}
          />
          Copyright - O bag for You 2022
        </p>
      </div>
      <nav className={styles['navbar']}>
        <ul className={styles['navbar-menu']}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>

          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <ul className={styles['navbar-icons']}>
          <li className={styles['follow']}>FOLLOW</li>
          <li>
            <a href="https://www.facebook.com/Obag">
              <FontAwesomeIcon
                icon={faFacebook}
                className={styles['facebook']}
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/obagofficial/">
              <FontAwesomeIcon
                icon={faInstagram}
                className={styles['instagram']}
              />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCBgoYa0VVaPCXr6SsehLeUg">
              <FontAwesomeIcon icon={faYoutube} className={styles['youtube']} />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
