import { useState } from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/AuthContext';
import { CartContext } from '../../features/Cart/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const { cart, setCart } = useContext(CartContext);

  return (
    <>
      <nav className={styles['navbar']}>
        <div className={styles['logo']}>
          <NavLink to="/">
            <FontAwesomeIcon
              icon={solid('bag-shopping')}
              className={styles['logo-bag']}
            />
            O bag
          </NavLink>
        </div>

        <ul className={styles['navbar-menu']}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <ul className={styles['navbar-second-menu']}>
          <li>
            <NavLink to="/wishlist">
              <FontAwesomeIcon icon={solid('heart')} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <FontAwesomeIcon icon={solid('shopping-cart')} />({cart.length})
            </NavLink>
          </li>

          {user && (
            <>
              <li className={styles['welcome']}>
                Welcome, {user.firstName}!
                <FontAwesomeIcon
                  className={styles['angle-down']}
                  icon={solid('angle-down')}
                  onClick={(e) => setIsActive(!isActive)}
                />
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <NavLink to="/register">Join Us</NavLink>
              </li>
              <li>
                <NavLink to="/login">Sign In</NavLink>
              </li>
            </>
          )}
        </ul>

        {user && (
          <>
            {isActive && (
              <>
                <div className={styles['dropdown-menu']}>
                  <div className={styles['user-info']}>
                    <FontAwesomeIcon icon={solid('circle-user')} />
                    <h3>
                      {user.firstName} {''}
                      {user.lastName}
                    </h3>
                    <hr />
                  </div>
                  <hr />
                  <ul>
                    <li>
                      <a href={`/userProfile/${user.id}`}>
                        <FontAwesomeIcon
                          icon={solid('id-card-clip')}
                          className={styles['user-card']}
                        />
                        User account
                      </a>
                    </li>
                    {user.isAdmin && (
                      <>
                        <li>
                          <a href={`/userMessages/${user.id}`}>
                            <FontAwesomeIcon
                              icon={solid('envelope')}
                              className={styles['mailbox']}
                            />
                            Messages
                          </a>
                        </li>
                      </>
                    )}
                    <li>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                          navigate('/');
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solid('right-from-bracket')}
                          className={styles['logout']}
                        />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </nav>
    </>
  );
}
