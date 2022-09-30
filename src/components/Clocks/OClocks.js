import styles from './OClocks.module.css';

export function OClocks() {
  return (
    <section className={styles['clocks']}>
      <div className={styles['container']}>
        <div className={styles['image']}>
          <img src="../images/clocks.jpg" alt="clocks" />
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
          <button>Shop now</button>
        </div>
      </div>
    </section>
  );
}
