import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/AuthContext';
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function Modal({ closeModal }) {
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();
  const { productId } = useParams();

  async function handleDeleteProduct() {
    await fetch(`http://localhost:3005/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    navigate('/products');
  }
  return (
    <div className={styles['modal-background']}>
      <div className={styles['modal-container']}>
        <button
          className={styles['close-btn']}
          onClick={() => closeModal(false)}
        >
          X
        </button>
        <div className={styles['title']}>
          <h1>Are you sure you want to delete the product?</h1>
        </div>
        <div className={styles['body']}>
          <p>
            The products are great! You should move forward, you will enjoy it!
          </p>
        </div>
        <div className={styles['footer']}>
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button onClick={handleDeleteProduct}>
            Delete{''}
            <FontAwesomeIcon
              className={styles['trash']}
              icon={solid('trash')}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
