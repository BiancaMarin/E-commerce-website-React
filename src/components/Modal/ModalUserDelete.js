import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/AuthContext';
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function ModalUserDelete({ closeModal }) {
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();
  const { userId } = useParams();

  async function handleDeleteUser() {
    await fetch(`http://localhost:3005/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    navigate('/userProfile');
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
          <h1>Are you sure you want to delete the account?</h1>
        </div>
        <div className={styles['body']}></div>
        <div className={styles['footer']}>
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button onClick={handleDeleteUser}>
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
