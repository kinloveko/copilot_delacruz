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
        public IActionResult GetContacts([FromQuery] string searchTerm)
        {

            var contacts = _contactService.GetContacts(searchTerm);
            //check if contacts length is equal to 0
            if (contacts.Count() == 0)
            {
                return NotFound();
            }
            return Ok(contacts);
        }

        //Create a get contact by id http get
        [HttpGet("{id}")] 
        public ActionResult GetContactById(Guid id)
        {
            return Ok(_contactService.GetContactById(id));
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
