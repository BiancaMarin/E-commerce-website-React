import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from '../../../components/Nav/Nav';
import { Footer } from '../../../components/Footer/Footer';

import styles from './MessageDetails.module.css';

export function MessageDetails() {
  const [messages, setMessages] = useState();
  const { messageId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3005/api/messages/${messageId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [messageId]);

  if (!messages) {
    return <strong>Loading...</strong>;
  }

  return (
    <>
      <Nav />
      <section>
        <div className={styles['message-details']}>
          <h3 className={styles['title']}>
            Message from: {messages.firstName} {messages.lastName}
          </h3>
          <p className={styles['email-address']}>
            Email address:{' '}
            <span className={styles['email']}>{messages.email}</span>
          </p>
          <p className={styles['text']}>
            Text:{' '}
            <span className={styles['user-text']}>{messages.userMessage}</span>{' '}
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
