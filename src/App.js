import React, { Component } from 'react';
// import {uuid} from 'uuidv4';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import './App.css';
import { v4 as uuid_v4 } from "uuid";

class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const newContact = {
      id: uuid_v4(),
      name,
      number,
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      }
    });
  }

  handleChangeFilter = filter => {
    this.setState({filter});
  }

  getFilteredContacts = () => {
    const {contacts, filter} = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  handleRemove = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({id}) => id !== contactId)
      }
    })
  }

  render() {
    const {contacts, filter} = this.state;
    return(
      <>
        <div className="Container">
          <section title="Phonebook" className="Section">
            <h1 className="bigText">Phonebook</h1>
            <ContactForm contacts={contacts} onAddContact={this.addContact}/>
          </section>
          <section title="Contacts" className="Section">
            <h2 className="bigText">Contacts</h2>
            <Filter value={filter} onChangeFilter={this.handleChangeFilter}/>
            <ContactList filteredContacts={this.getFilteredContacts()} onRemove={this.handleRemove} />
          </section>
        </div>
      </>
    )
  }
}

export default App;