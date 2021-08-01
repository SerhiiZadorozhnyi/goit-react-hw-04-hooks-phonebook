// import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';


function ContactList({ contacts, onDeleteContact }) {
    return (
      <ul className={styles.list}>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={styles.item}>
            <p className={styles.text}>
              {name}: {number}
            </p>
            <button
              type="button"
              onClick={() => onDeleteContact(id)}
              className={styles.button}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
  
  ContactList.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
  };
  
  export default ContactList;



// const ContactListItem = ({name, number, onClickRemove}) => {
//     return (
//         <li className={styles.contactListItem}>
//             <p>{name}: {number}</p>
//             <button 
//                 type="button" 
//                 className={styles.contactListButton} 
//                 onClick={onClickRemove}
//             >
//                 Delete
//             </button>
//         </li>
//     )
// }

// const ContactList = ({filteredContacts, onRemove}) => {
//     return (
//         filteredContacts.length > 0 && (
//             <ul className={styles.contactList}>
//                 {filteredContacts.map(({id, name, number}) => (
//                     <ContactListItem key={id} name={name} number={number} onClickRemove={() => onRemove(id)} />
//                 ))}
//             </ul>
//         )
//     )
// }

// ContactListItem.propTypes = {
//     name: PropTypes.string.isRequired,
//     number: PropTypes.string.isRequired,
//     onClickRemove: PropTypes.func.isRequired,
// }

// ContactList.propTypes = {
//     filteredContacts: PropTypes.arrayOf(
//         PropTypes.exact({
//             id: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired,
//             number: PropTypes.string.isRequired,
//         })
//         ),
//         onRemove: PropTypes.func.isRequired,
// }

// export default ContactList;