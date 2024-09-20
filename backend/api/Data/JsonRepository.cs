using backend.Models;
using System.Text.Json;

namespace backend.Data
{
    public class JsonRepository
    {
        public List<Contact> Contacts { get; set; }

        //create a constructor that reads the contact.json file content and stores it to Contacts property
        public JsonRepository()
        {
            string json = File.ReadAllText("contact.json");
            Contacts = JsonSerializer.Deserialize<List<Contact>>(json);
        }

        //CRUD

        //create a method that returns all contacts
        public List<Contact> GetContacts()
        {
            return Contacts;
        }

        //create a method that returns a contact by id
        public Contact GetContactById(Guid id)
        {
            return Contacts.FirstOrDefault(c => c.Id == id);
        }

        //create a method that adds a contact
        public void AddContact(Contact contact)
        {
            Contacts.Add(contact);
        }

        //Create a method to update contact 
        public void UpdateContact(Contact contact)
        {
            var existingContact = Contacts.FirstOrDefault(c => c.Id == contact.Id);
            if (existingContact != null)
            {
                existingContact.FirstName = contact.FirstName;
                existingContact.LastName = contact.LastName;
                existingContact.PhoneNumber = contact.PhoneNumber;
                existingContact.Address = contact.Address;
            }
        }

        //create a method that deletes a contact
        public void DeleteContact(Guid id)
        {
            var contact = Contacts.FirstOrDefault(c => c.Id == id);
            if (contact != null)
            {
                Contacts.Remove(contact);
            }
        }

        //create a method that saves the contacts to the json file
        public void SaveContacts()
        {
            string json = JsonSerializer.Serialize(Contacts);
            File.WriteAllText("contact.json", json);
        }

    }
}
