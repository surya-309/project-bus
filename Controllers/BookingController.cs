using Busticket.Controllers;
using Busticket.Data;
using Busticket.Models;
using Busticket.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Busticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        BookingRepository r = new BookingRepository();
        private readonly IBookingRepository repo;
       
        public BookingController(IBookingRepository repo)
        {
            this.repo = repo;
        }
        [HttpPost]
        [Authorize]
        public IActionResult Book([FromBody] List< Bookings> booking)
        {
            var currentUser = User.Claims.FirstOrDefault(c=>c.Type == ClaimTypes.Email )?.Value;
            return Ok(repo.BookTicket(booking,currentUser));


        }
        
    }
}


