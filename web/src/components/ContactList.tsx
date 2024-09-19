import React from 'react';
import { Contact } from '../interfaces/Contact';

// create a new component called ContactList
// this component will accept a prop called contacts
interface Props {
  contacts:Contact[];
}

function ContactList({ contacts }: Props) {
  return (
    <div>
      <h1 className='list_title'>Contact List</h1>
      <ul className='list'>
        {contacts.map((contact,index) => (
          <li key={index} className='list_item'>
            <p>{contact.firstName} {contact.lastName}</p>
            <div><p>{contact.phoneNumber}</p>  <p>{contact.address}</p></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;