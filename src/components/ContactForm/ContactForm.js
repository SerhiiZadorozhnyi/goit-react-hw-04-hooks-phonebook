import { useState } from 'react';
import styles from './ContactForm.module.css';


function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name, number);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Ім'я:
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Jack Sparrow"
            onChange={handleChange}
            className={styles.input}
          />
      </label>

      <label className={styles.label}>
        Номер:
          <input
            type="tel"
            name="number"
            value={number}
            placeholder="111-11-11"
            onChange={handleChange}
            className={styles.input}
          />
      </label>
      <button type="submit" className={styles.button} disabled={name === '' || number === ''}>
        Додати контакт
      </button>
    </form>
  );
}
  
export default ContactForm;