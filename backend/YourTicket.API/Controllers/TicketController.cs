using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using YourTicket.API.Models;
using YourTicket.API.Persistance.Database;
using YourTicket.API.Persistance.Models;

namespace YourTicket.API.Controllers
{
    [Route("ticket")]
    [ApiController]
    [Authorize]
    public class TicketController : ControllerBase
    {
        public UserManager<ApplicationAccount> UserManager { get; }
        public MainDbContext MainDbContext { get; }

        public TicketController(UserManager<ApplicationAccount> userManager, MainDbContext mainDbContext)
        {
            UserManager = userManager;
            MainDbContext = mainDbContext;
        }


        [HttpGet]
        public ActionResult GetItems()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult GetItem(int id)
        {
            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateTicket(CreateTicketRequest request)
        {
            var user = await UserManager.GetUserAsync(User);

            var result = MainDbContext.Tickets.Add(new Ticket() {
                Title = request.Title,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow,
                Status = TicketStatus.PENDING
            });

            MainDbContext.SaveChanges();

            return Ok(new {
                TicketId = result.Entity.Id.ToString("00000"),
                CreatedAt = result.Entity.CreatedAt,
                Status = result.Entity.Status
            });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateItem(int id)
        {
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            
            return NoContent();
        }
    }
}
