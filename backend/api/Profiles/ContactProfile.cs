using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Profiles
{
    public class ContactProfile : Profile
    {   
        //create a mapping profile for contact, and for CreateContactDto to generate an Id of type int
        public ContactProfile() {
        
            CreateMap<Contact, ReadContactDTO>().ReverseMap();
            CreateMap<CreateContactDTO, Contact>().ForMember(c => c.Id, opt => opt.Ignore()).ReverseMap();
            CreateMap<UpdateContactDTO, Contact>().ReverseMap();
        }

    }
}
