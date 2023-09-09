using Microsoft.AspNetCore.Identity;

namespace YourTicket.API.Persistance.Models;

public class ApplicationAccount : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

}