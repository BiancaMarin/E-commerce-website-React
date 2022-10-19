import { Link } from 'react-router-dom';
import styles from './OSquare.module.css';

export function OSquare() {
  return (
    <section className={styles['o-square']}>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h2>Back to office!</h2>
          <strong>O Square</strong>
          <p>
            A unique piece, 100% Made in Italy. Capacious and resistant, it
            immediately became a must-have.
          </p>
          <Link to="/products">
            <button>Shop now</button>
          </Link>
        </div>
        <img
          className={styles['image']}
          src="../images/square.jpg"
          alt="square"
        />
      </div>
    </section>
  );
}
