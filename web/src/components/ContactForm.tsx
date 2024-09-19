import React,{useState} from "react";
import { Contact } from "../interfaces/Contact";
import { CreateContact } from "../interfaces/CreateContact";


interface Props {
  handleAddContact: (contact: CreateContact) => void;
}


//create a simple function that has a div and a form inside it
//inputs are for FirstName, LastName, PhoneNumber and Address
//the form will have a submit button

function ContactForm({handleAddContact}: Props) {
  //create a state variable that will hold the value of the input fields
  const [contact,setContacts] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: ""
  });

  //create a function that will handle input changes im using typescript
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //get the id and value of the input field
        const { id, value } = event.target;
        //update the state variable with the new value
        setContacts({
            ...contact,
            [id]: value
        });
    }

    //create a function that will handle form submission
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(contact);
        await handleAddContact(contact);
    }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form_title">Contact Form</h1>
        <label>First Name</label>
        <input className="form_input" type="text" placeholder="First Name" id="firstName" value={contact.firstName} onChange={handleChange} />
        <label>Last Name</label>
        <input className="form_input" type="text" placeholder="Last Name" id="lastName"  value={contact.lastName} onChange={handleChange}/>
        <label>Phone Number</label>
        <input className="form_input" type="text" placeholder="Phone Number" id="phoneNumber"   value={contact.phoneNumber} onChange={handleChange}/>
        <label>Address</label>
        <input className="form_input" type="text" placeholder="Address" id="address"  value={contact.address} onChange={handleChange}/>
        <br />
        <button className="form_button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;