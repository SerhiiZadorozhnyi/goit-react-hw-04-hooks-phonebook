import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';


function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactCheck = () => {
    const namesIsIn = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      [],
    );
    const numbersIsIn = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      [],
    );

    if (namesIsIn.includes(name) || numbersIsIn.includes(number)) {
      alert(`${name}${number} is already in contacts`);
    }

    if (name === '' || number === '') {
      alert('Enter all data, please');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    setName('');
    setNumber('');
    if (contactCheck()) {
      return;
    }

    onSubmit(name, number);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name:
          <input
          type="text"
          name="name"
          value={name}
          placeholder="Jack Sparrow"
          onChange={event => setName(event.currentTarget.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Number:
          <input
          type="tel"
          name="number"
          value={number}
          placeholder="111-11-11"
          onChange={event => setNumber(event.currentTarget.value)}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        Add contact
        </button>
    </form>
  );
}
  
  
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
  
export default ContactForm;