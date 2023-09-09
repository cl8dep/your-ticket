using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using YourTicket.API.Persistance.Database;
using YourTicket.API.Persistance.Models;

namespace YourTicket.API.Controllers
{
    [Route("media")]
    [ApiController]
    [AllowAnonymous]
    public class MediaController : ControllerBase
    {
        public UserManager<ApplicationAccount> UserManager { get; }
        public MainDbContext MainDbContext { get; }

        public MediaController(UserManager<ApplicationAccount> userManager, MainDbContext mainDbContext)
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
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file)
        {
            var filePath = Path.Combine(Environment.GetEnvironmentVariable("UPLOAD_FOLDER"), file.FileName);

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new {
                Url = file.FileName
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
