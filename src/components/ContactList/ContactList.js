import PropTypes from 'prop-types';
import styles from './ContactList.module.css';


function ContactList ({ contacts, onDeleteContact }) {
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.item}>
          <p className={styles.text}>{name}</p>
          <p className={styles.text}>{number}</p>
          <button
            type="button"
            onClick={() => onDeleteContact(id)}
            className={styles.button}
          >
            Видалити
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};
  
export default ContactList;