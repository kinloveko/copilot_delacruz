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
        public ActionResult GetContacts()
        {
            return Ok(_contactService.GetContacts());
        }

        //Create a get contact by id http get
        [HttpGet("{id}")]
        public ActionResult GetContactById(int id)
        {
            return Ok(_contactService.GetContactById(id));
        }

        //Create a create contact http post
        [HttpPost]
        public ActionResult AddContact(CreateContactDTO contact)
        {
            return Ok(_contactService.AddContact(contact));
        }

        //Create a update contact http put
        [HttpPut]
        public ActionResult UpdateContact(UpdateContactDTO contact)
        {
            return Ok(_contactService.UpdateContact(contact));
        }

        //Create a delete contact http delete
        [HttpDelete("{id}")]
        public ActionResult DeleteContact(int id)
        {
            _contactService.DeleteContact(id);
            return NoContent();
        }
    }

}
