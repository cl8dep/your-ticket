using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using YourTicket.API.Persistance.Database;
using YourTicket.API.Persistance.Models;

namespace YourTicket.API.Controllers
{
    [Route("auth")]
    [ApiController]
    public class ExternalAuthController : ControllerBase
    {
        public UserManager<ApplicationAccount> UserManager { get; }

        public ExternalAuthController(UserManager<ApplicationAccount> userManager)
        {
            UserManager = userManager;
        }


        [HttpGet("google")]
        public ActionResult GoogleAuthentication()
        {

            var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleCallback") };
            return Challenge(properties, "Google");
        }

        [HttpGet("google-callback")]
        public  ActionResult GoogleCallback()
        {
            return Ok();
            // var authResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            // var claims = authResult?.Principal?.Identities.FirstOrDefault()?.Claims;
            // if (claims == null)
            // {
            //     return BadRequest("There is no registered google account");
            // }


            // try
            // {
            //     var emailClaim = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);
            //     string email = emailClaim == null ? string.Empty : emailClaim.Value.ToString();
            //     var nameClaim = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);

            //     var newUser = new ApplicationAccount
            //     {
            //         UserName = emailClaim?.Value,
            //         Email = email,
            //         FirstName = nameClaim?.Value ?? "Default Display Name",
            //     };

            //     var result = await UserManager.CreateAsync(newUser);

            //     if (result.Succeeded)
            //     {
            //         return Ok();
            //     }
            //     return BadRequest("Invalid Request");
            // }
            // catch
            // {
            //     return BadRequest("Invalid Request");
            // }

        }


    }
}
