import { Link } from 'react-router-dom';
import styles from './OClocks.module.css';

export function OClocks() {
  return (
    <section className={styles['clocks']}>
      <div className={styles['container']}>
        <div className={styles['image']}>
          <img
            src="https://i1.wp.com/www.passioneorologio.it/wp-content/uploads/2018/08/oclock-obag-orologi-modelli.jpg?resize=1023%2C1024&ssl=1"
            alt="clocks"
          />
        </div>
        <div className={styles['content']}>
          <h1>O Clock</h1>
          <p>
            Discover the unique and colorful modular clock! The accessory to
            match your look with a simple step.
          </p>
          <p>
            Enjoy matching many and coloured movements to practical straps in
            silicone.
          </p>
          <Link to="/products">
            <button>Shop now</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
