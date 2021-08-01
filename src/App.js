import React, { useState, useEffect, useRef } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import styles from './App.css';
import { v4 as uuidv4 } from "uuid";

const savedContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(savedContacts);
  const [filter, setFilter] = useState('');
  const firstUse = useRef(true);

  useEffect(() => {
    if (firstUse.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContacts(parsedContacts);
      }

      firstUse.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts([contact, ...contacts]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts();
  const totalContactsCount = contacts.length;

  return (
    <>
      <div className={styles.container}>
        <section title="Phonebook" className="Section">
            <h1 className={styles.bigText}>Phonebook</h1>
            <ContactForm onSubmit={addContact} contacts={contacts} />
        </section>
        <section title="Contacts" className="Section">
            <h2 className={styles.bigText}>Contacts</h2>
            <p>Общее кол-во: {totalContactsCount}</p>
            <Filter value={filter} onChange={event => setFilter(event.currentTarget.value)} />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={deleteContact}
            />
        </section>
      </div>
    </>
  );
}

export default App;