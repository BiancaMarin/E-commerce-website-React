import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';

import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <>
      <Nav />
      <div className={styles['not-found']}>
        <h1>404</h1>
        <h2>Oops! Page not found.</h2>

        <p>We can't find the page you're looking for.</p>
        <div className={styles['btns']}>
          <button>
            <Link to="/">Go back home</Link>
          </button>
          <button>
            <Link to="/products">Search for more products</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
