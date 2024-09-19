
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
        public List<ReadContactDTO> GetContacts()
        {     
            var contacts = _jsonRepository.GetContacts();
            return _mapper.Map<List<ReadContactDTO>>(contacts);
        }

        public ReadContactDTO GetContactById(int id)
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

        public void DeleteContact(int id)
        {
            _jsonRepository.DeleteContact(id);
            _jsonRepository.SaveContacts();
        }
    }
}
