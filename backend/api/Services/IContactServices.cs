using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IContactServices
    {
        // Crud methods from the JsonRepository class
        List<ReadContactDTO> GetContacts();
        ReadContactDTO GetContactById(Guid id);
        ReadContactDTO AddContact(CreateContactDTO contact);
        ReadContactDTO UpdateContact(UpdateContactDTO contact);
        void DeleteContact(Guid id);

    }
}
