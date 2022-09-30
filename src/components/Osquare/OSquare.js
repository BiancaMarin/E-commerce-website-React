import styles from './OSquare.module.css';

export function OSquare() {
  return (
    <section className={styles['o-square']}>
      <div className={styles['container']}>
        <img
          className={styles['image']}
          src="../images/square.png"
          alt="square"
        />
        <div className={styles['content']}>
          <h2>Back to office!</h2>
          <strong>O Square</strong>
          <p>
            A unique piece, 100% Made in Italy. Capacious and resistant, it
            immediately became a must-have.
          </p>
          <button>Shop now</button>
        </div>
        <img
          className={styles['image']}
          src="../images/img2.jpg"
          alt="square"
        />
      </div>
    </section>
  );
}
