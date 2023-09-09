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
using YourTicket.API.Persistance.Services;

namespace YourTicket.API.Controllers
{
    [Route("ticket")]
    [ApiController]
    [Authorize]
    public class TicketController : ControllerBase
    {
        public UserManager<ApplicationAccount> UserManager { get; }
        public TicketsService TicketsService { get; }

        public TicketController(UserManager<ApplicationAccount> userManager, TicketsService ticketsService)
        {
            UserManager = userManager;
            TicketsService = ticketsService;
        }


        [HttpGet]
        public ActionResult GetItems()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetTicketDetails(int id)
        {

            if (User.Identity.IsAuthenticated)
            {
                // El usuario está autenticado, devuelve una respuesta personalizada
                return Ok("¡Bienvenido, usuario autenticado!");
            }
            else
            {
                var result = await TicketsService.GetTicketDetails(id);
                return result.IsSuccess ? Ok(result.Value) : result.Errors.First(x => x.Message.Contains("NOT_FOUND")) != null ? NotFound() : BadRequest(result.Errors);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateTicket(CreateTicketRequest request)
        {
            var user = await UserManager.GetUserAsync(User);

            var result = await TicketsService.CreateTicket(new Ticket()
            {
                Title = request.Title,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow,
                ModifiedAt = DateTime.UtcNow,
                Status = TicketStatus.PENDING
            });

            return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Errors);
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
