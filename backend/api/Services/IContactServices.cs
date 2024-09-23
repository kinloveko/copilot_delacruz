using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IContactServices
    {
        // Crud methods from the JsonRepository class
        IEnumerable<ReadContactDTO> GetContacts(string searchTerm = null);
        ReadContactDTO GetContactById(Guid id);
        ReadContactDTO AddContact(CreateContactDTO contact);
        ReadContactDTO UpdateContact(UpdateContactDTO contact);
        void DeleteContact(Guid id);

    }
}
