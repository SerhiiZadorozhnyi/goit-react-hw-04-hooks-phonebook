import React, { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import styles from './App.css';
import { v4 as uuidv4 } from "uuid";


const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {

  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    if(contacts.find(contact => contact.name === name)) {
      alert(`Контакт з таким іменнем вже існує!`);
      return;
    }
    const newContacts = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts(prevState => [newContacts, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const visibleContacts = () => {
    const normalized = filter.toLowerCase().trim();
    return contacts.filter(({ name }) => 
      name.toLowerCase().includes(normalized),
    );
  };

  const totalContactsCount = contacts.length;

  return (
    <>
      <div className={styles.container}>
        <section title="Phonebook" className="Section">
            <h1 className={styles.bigText}>Телефонна книга</h1>
            <ContactForm onSubmit={addContact} />
        </section>
        <section title="Contacts" className="Section">
            <h2 className={styles.bigText}>Контакти</h2>
            <p>Загальна кількість: {totalContactsCount}</p>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={visibleContacts()}
              onDeleteContact={deleteContact}
            />
        </section>
      </div>
    </>
  );
}

export default App;