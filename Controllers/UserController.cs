using Busticket.Aspects;
using Busticket.Models;
using Busticket.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Busticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ExceptionHandler]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository repo;
        public UserController(IUserRepository repo) 
        {
            this.repo = repo;
        }

        [HttpPost("[action]")]
        public IActionResult Post([FromBody] Users user)
        {
            return Ok(repo.AddUser(user));
        }
        [HttpGet]
        [Authorize(Roles ="Admin")]
        public IActionResult GetAll()
        {
            return Ok(repo.GetAll());
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] Users user)
        {
            return Ok(repo.Login(user));

        }
        [HttpDelete("{name}")]
        [Authorize]
        public IActionResult Cancel(string name)
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            return Ok(repo.Cancel(name, email));
        }
        [HttpGet("[action]")]
        [Authorize(Roles = "User")]
        public IActionResult Getmytickets()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            return Ok(repo.getmyticket(email));

        }
        [HttpGet("[action]")]
        [Authorize(Roles = "Admin")]
        public IActionResult Getalltickets()
        {
            return Ok(repo.getAllTickets());
        }

    }
}