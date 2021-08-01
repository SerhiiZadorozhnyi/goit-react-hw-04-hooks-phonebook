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


// const INITIAL_STATE = {
//     name: '',
//     number: '',
//   }

// export default class ContactForm extends Component {

//     state = INITIAL_STATE;

//     handleChange = (type, e) => {
//         const {contacts} = this.props;
//         if (type==='name') {
//           const contactInState = contacts.find(contact => contact.name.toLowerCase() === e.target.value.toLowerCase());
//           if (contactInState) {
//             alert(`${contactInState.name} is already in contacts!`);
//           }
//         }
//         this.setState({[type]: e.target.value})
//     }

//     handleSubmit = e => {
//         e.preventDefault();
//         const {name, number} = this.state;
//         const {contacts, onAddContact} = this.props;
//         const contactInState = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
//         contactInState && alert(`${contactInState.name} is already in contacts!`);
//         if (!contactInState && name && number) {
//             onAddContact(name, number);
//             this.setState(INITIAL_STATE);
//         }
//     }
    
//     render() {
//         const {name, number} = this.state;
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <h3 className={styles.text}>Name</h3>
//                 <label><input type="text" value={name} onChange={e => this.handleChange('name', e)} /></label><br/>
//                 <h3 className={styles.text}>Number</h3>
//                 <label><input type="tel" value={number} onChange={e => this.handleChange('number', e)} /></label><br/>
//                 <div className={styles.divButton}>
//                     <button type="submit" className={styles.buttonForm}>Add contact</button>
//                 </div>
//             </form>
//         )
//     }
// }

// ContactForm.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.exact({
//             id: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired,
//             number: PropTypes.string.isRequired,
//         })
//     ),
//     onAddContact: PropTypes.func.isRequired,
// }