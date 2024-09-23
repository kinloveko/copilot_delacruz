
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public class JsonContactService : IContactServices
    {
        //Inject  the JsonRepository and IMapper
        private readonly JsonRepository _jsonRepository;
        private readonly IMapper _mapper;

        public JsonContactService(JsonRepository jsonRepository, IMapper mapper)
        {
            _jsonRepository = jsonRepository;
            _mapper = mapper;
        }

        //CRUD methods from IContactServices to be implemented by utilizing the JsonRepository methods and the mapper
        public IEnumerable<ReadContactDTO> GetContacts(string searchTerm = null)
        {
            var filteredContacts = string.IsNullOrEmpty(searchTerm)
                ? _jsonRepository.GetContacts()
                : _jsonRepository.GetContacts().Where(c =>
                    c.FirstName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                    c.LastName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                    c.PhoneNumber.Contains(searchTerm) ||
                    c.Email.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                    c.Address.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));

            return _mapper.Map<IEnumerable<ReadContactDTO>>(filteredContacts);
        }

        public ReadContactDTO GetContactById(Guid id)
        {
            var contact = _jsonRepository.GetContactById(id);
            return _mapper.Map<ReadContactDTO>(contact);
        }

        public ReadContactDTO AddContact(CreateContactDTO contact)
        {
            var newContact = _mapper.Map<Contact>(contact);
            _jsonRepository.AddContact(newContact);
            _jsonRepository.SaveContacts();
            return _mapper.Map<ReadContactDTO>(newContact);
        }

        public ReadContactDTO UpdateContact(UpdateContactDTO contact)
        {
            var newContact = _mapper.Map<Contact>(contact);
            _jsonRepository.UpdateContact(newContact);
            _jsonRepository.SaveContacts();
            return _mapper.Map<ReadContactDTO>(newContact);
        }


        public void DeleteContact(Guid id)
        {
            _jsonRepository.DeleteContact(id);
            _jsonRepository.SaveContacts();
        }
    }
}
