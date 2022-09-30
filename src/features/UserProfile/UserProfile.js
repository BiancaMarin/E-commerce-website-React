import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/AuthContext';
import styles from './UserProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ModalUserDelete } from '../../components/Modal/ModalUserDelete';
import { Nav } from '../../components/Nav/Nav';
import { Footer } from '../../components/Footer/Footer';

export function UserProfile() {
  const [userAccount, setUserAccount] = useState(null);
  const { user, accessToken } = useAuthContext();
  const { userId } = useParams();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3005/users/' + userId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserAccount(data));
  }, [userId, accessToken]);

  if (!userAccount) {
    return <strong>Loading...</strong>;
  }
  return (
    <>
      <section>
        <Nav />
        <h1 className={styles['user-title']}>Account informations</h1>
        <div className={styles['container']}>
          <div className={styles['first-column']}>
            <div>
              <img
                className={styles['image']}
                src={userAccount.src}
                alt={`${userAccount.firstName} Src`}
              />
            </div>
          </div>
          <div className={styles['second-column']}>
            <ul>
              <li className={styles['name']}>
                {userAccount.firstName}
                <span className={styles['lastName']}>
                  {' '}
                  {userAccount.lastName}
                </span>
              </li>
              <li>E-mail: {userAccount.email}</li>
              <li>Phone number: {userAccount.phone}</li>
              <li>{userAccount.country}</li>
              <li>{userAccount.city}</li>
              <li>{userAccount.gender}</li>
            </ul>

            <div className={styles['btns']}>
              <Link to={`/userProfile/edit/${user.id}`}>
                <button>
                  Edit Account{' '}
                  <FontAwesomeIcon
                    className={styles['edit']}
                    icon={solid('pen')}
                  />
                </button>
              </Link>
              <button
                onClick={() => {
                  setModal(true);
                }}
              >
                Delete
                <FontAwesomeIcon
                  className={styles['delete']}
                  icon={solid('trash')}
                />
              </button>
              {modal && <ModalUserDelete closeModal={setModal} />}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
