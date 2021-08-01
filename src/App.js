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


// const savedContacts = [
//   {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//   {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//   {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//   {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
// ]

// // class App = () => {
// function App(){

//   const [contacts, setContacts] = useState(savedContacts);
//   const [filter, setFilter] = useState('');


//   // state = {
//   //   contacts: [
//   //     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//   //     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//   //     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//   //     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//   //   ],
//   //   filter: '',
//   // }

//   const addContact = (name, number) => {
//     // const newContact = {
//       const contact = {
//       id: uuid_v4(),
//       name,
//       number,
//     };
//     setContacts([contact, ...contacts])
//     // setContacts((contacts) => {contact, ...contacts});

//     // this.setState(prevState => {
//     //   return {
//     //     contacts: [...prevState.contacts, newContact],
//     //   }
//     // });
//   };

//   const handleChangeFilter = filter => {
//     this.setState({filter});
//   };

//   // const getFilteredContacts = () => {
//   //   // const {contacts, filter} = this.state;
//   //   const {contacts, filter} = filter;
//   //   return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
//   // };

//   const getFilteredContacts = () => {
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   const deleteContact = contactId => {
//     // this.setState(prevState => {
//     //   return {
//     //     contacts: prevState.contacts.filter(({id}) => id !== contactId)
//     //   }
//     // })
//     setContacts(contacts.filter(contact => contact.id !== contactId));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({contacts: parsedContacts});
//     }
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   };

//   const filteredContacts = getFilteredContacts();

//   // render() {
//   //   const {contacts, filter} = this.state;
//     return(
//       <>
//         <div className="Container">
//           <section title="Phonebook" className="Section">
//             <h1 className="bigText">Phonebook</h1>
//             <ContactForm contacts={contacts} onAddContact={addContact}/>
//           </section>
//           <section title="Contacts" className="Section">
//             <h2 className="bigText">Contacts</h2>
//             <Filter value={filter} onChangeFilter={handleChangeFilter}/>
//             <ContactList 
//               filteredContacts={filteredContacts} 
//               onRemove={deleteContact} />
//           </section>
//         </div>
//       </>
//     )
//   // }
// }

export default App;