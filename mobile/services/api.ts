import axios from "axios";
import { CreateContact } from "../interfaces/CreateContact";
import { Contact } from "../interfaces/Contact";

//configure axios to fetch data from localhost:5000
const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

//getallcontacts function that will fetch all contacts from the backend, with optional search query
export const getAllContacts = async (searchQuery?: string): Promise<any> => {
  try {
    const endpoint = searchQuery
      ? `/contacts?searchTerm=${searchQuery}`
      : "/contacts";
    const response = await api.get(endpoint);
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
  }
};

//createcontact function that will create a new contact
export const createContact = async (contact: CreateContact): Promise<any> => {
  const { data } = await api.post("/contacts", contact);
  return data;
};

//deletecontact function that will delete a contact
export const deleteContact = async (id: string): Promise<any> => {
  const response = await api.delete(`/contacts/${id}`);
  console.log(response);
  return response;
};

//updatecontact function that will update a contact
export const updateContact = async (contact: Contact): Promise<any> => {
  try {
    const response = await api.put(`/contacts`, contact, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
