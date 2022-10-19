import { Nav } from '../../components/Nav/Nav';
import { Trending } from '../../components/Trending/Trending';
import { OClocks } from '../../components/Clocks Section/OClocks';
import { OSquare } from '../../components/Osquare Section/OSquare';
import { Footer } from '../../components/Footer/Footer';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <>
      <Nav />
      <section className={styles['landing-page']}>
        <div className={styles['content']}>
          <h1>Make your style with O bag</h1>
        </div>
        <div className={styles['btn']}>
          <a href="/products">
            <button>Discover now</button>
          </a>
        </div>
      </section>
      <Trending />
      <OClocks />
      <OSquare />
      <Footer />
    </>
  );
}
