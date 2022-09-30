import { Footer } from '../../components/Footer/Footer';
import { Nav } from '../../components/Nav/Nav';
import styles from './AboutUs.module.css';

export function AboutUs() {
  return (
    <>
      <Nav />
      <main className={styles['about-page']}>
        <section className={styles['section']}>
          <div>
            <img
              src="https://cdn.obag.filoblu.com/media/contentmanager/content/resized/767x/contentmanager/content/marchio%20720x800px.jpg"
              alt=""
            />
          </div>
          <div className={styles['info-obag']}>
            <h1>Who we are?</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              dolorem iste esse, architecto repudiandae voluptate suscipit
              recusandae possimus ipsa quis ex sint earum. Eius iusto modi quis
              similique necessitatibus ducimus.
            </p>
          </div>
        </section>
        <section className={styles['section']}>
          <div className={styles['info-research']}>
            <h1>Research and Innovation</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptates, sint? Id recusandae dolor vero, impedit similique quam
              quaerat quas, praesentium in omnis voluptatum suscipit quibusdam,
              porro consequatur ipsa saepe eius.
            </p>
          </div>
          <div>
            <img
              src="https://www.obagstore.pl/media/magefan_blog/o-bag-spa2.jpg"
              alt=""
            />
          </div>
        </section>
        <section className={styles['section']}>
          <div className={styles['info-everywhere']}>
            <h1>O bag Everywhere</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sint
              quis voluptate veritatis dolorum suscipit veniam nam rerum totam.
              Autem expedita, nisi natus hic consequuntur omnis corrupti. Ex,
              accusantium repellendus.
            </p>
          </div>
          <div>
            <img
              src="https://cdn.obag.filoblu.com/media/contentmanager/content/resized/400x/contentmanager/content/ig_2%20(10).jpg"
              alt=""
            />
          </div>
        </section>
        <section className={styles['section-colors']}>
          <div className={styles['info-colors']}>
            <h1>More Colors</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
              unde aperiam quae iste magnam ab hic rem et. Dolorem sint alias
              nihil rem excepturi eum suscipit quia, incidunt pariatur optio!
            </p>
          </div>
          <div className={styles['images']}>
            <img
              src="https://i.pinimg.com/originals/a3/bc/bc/a3bcbc467b0193b8d60103aedb1dc964.jpg"
              alt=""
            />
            <img
              src="https://zapingmoda.files.wordpress.com/2013/10/ins_p_426652.jpg"
              alt=""
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
