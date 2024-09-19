import React,{useEffect, useState} from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Contact } from './interfaces/Contact';
import { getAllContacts, createContact } from './services/api';
import { CreateContact } from './interfaces/CreateContact';


function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  //create a function to add a new contact to the contacts state
  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  }

  //create a handler to submit the contact data to the backend using the backend using the api layer
  const handleFormSubmit = async (contact: CreateContact) => {
    const createNewContact = await createContact(contact);
    addContact(createNewContact);
  }

  useEffect(() => {
    //fetch all contacts use getAllContacts function
    getAllContacts().then((contacts) => {
      setContacts(contacts);
      console.log("contacts",contacts);
    }).catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <ContactForm handleAddContact={handleFormSubmit} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
