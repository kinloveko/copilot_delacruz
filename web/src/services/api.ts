import axios from "axios";
import { CreateContact } from "../interfaces/CreateContact";
import { Contact } from "../interfaces/Contact";


//configure axios to fetch data from localhost:5000
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

//getallcontacts function that will fetch all contacts from the backend add typescript to the function
export const getAllContacts = async (): Promise<any> => {
    const {data} = await api.get("/contacts");
    return data;
}

//createcontact function that will create a new contact
export const createContact = async (contact: CreateContact): Promise<any> => {
    const {data} = await api.post("/contacts", contact);
    return data;
}

//delete contact function that will delete a contact
export const deleteContact = async (id: string): Promise<any> => {
    const {data} = await api.delete(`/contacts/${id}`);
    return data;
}

//update contact function that will update a contact    
export const updateContact = async (contact: Contact): Promise<any> => {
    const {data} = await api.put(`/contacts/${contact.Id}`, contact);
    return data;
}

