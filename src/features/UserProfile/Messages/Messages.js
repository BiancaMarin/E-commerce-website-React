import { useState, useEffect } from 'react';
import styles from './Messages.module.css';
import { Footer } from '../../../components/Footer/Footer';
import { Nav } from '../../../components/Nav/Nav';
import { MessageCard } from './MessageCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function Messages() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  if (!messages) {
    return <strong>Loading products...</strong>;
  }

  return (
    <>
      <Nav />
      <section className={styles['messages-page']}>
        <h1>
          <FontAwesomeIcon
            icon={solid('envelope')}
            className={styles['envelope']}
          />
          Your messages
        </h1>
        <div>
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
