using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        //create a constructor to inject the IContactServices
        private readonly IContactServices _contactService;
        public ContactsController(IContactServices contactService)
        {
            _contactService = contactService;
        }

        //CRUD http requests handler

        //Create a read contact http get
        [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(_contactService.GetContacts());
        }

        //Create a create contact http post
        [HttpPost]
        public IActionResult AddContact(CreateContactDTO contact)
        {
            return Ok(_contactService.AddContact(contact));
        }

        //Create a update contact http put
        [HttpPut]
        public IActionResult UpdateContact(UpdateContactDTO contact)
        {
            return Ok(_contactService.UpdateContact(contact));
        }

        //Create a delete contact http delete
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(Guid id)
        {
            _contactService.DeleteContact(id);
            return NoContent();
        }
    }

}
