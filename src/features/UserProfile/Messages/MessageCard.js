import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './MessageCard.css';

export function MessageCard({ message }) {
  const [read, setRead] = useState(false);

  function handleCheckbox() {
    read ? setRead(false) : setRead(true);
    console.log(read);
  }

  return (
    <article className="message-section">
      <Link to={`/messageDetails/${message.id}`}>
        <div className="message-card">
          <FontAwesomeIcon className="envelope" icon={solid('envelope')} />
          <h3 className={read ? 'message-read' : 'message-unread'}>
            Message from: {message.firstName} {message.lastName}{' '}
          </h3>
        </div>
      </Link>
      <form>
        <div className="form-display">
          <div>
            <input
              type="checkbox"
              name="read"
              id="read"
              value="read"
              onChange={handleCheckbox}
            />
          </div>
          <label className="read" htmlFor="read">
            Mark as read
          </label>
        </div>
      </form>
    </article>
  );
}
