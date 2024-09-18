namespace backend.Models
{
    public class Contact
    {
        //create a contact model that has an id, firstname, lastname, phonenumber and address
          public int Id { get; set; }
          public string FirstName { get; set; }
          public string LastName { get; set; }
          public string PhoneNumber { get; set; }
          public string Address { get; set; }
    }
}
