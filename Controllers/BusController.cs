using Busticket.Models;
using Busticket.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Busticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly IBusRepository repo;
        public BusController(IBusRepository repo)
        {
            this.repo = repo;
        }
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public IActionResult AddBus([FromBody] Bus bus)
        {
            repo.AddBus(bus);
            return StatusCode(StatusCodes.Status200OK);
        }


        [HttpGet]
        public IActionResult GetAllBuses()
        {
           return Ok( repo.GetAllBuses());

        }
        [HttpPut]
        public IActionResult UpdateBus(Bus bus)
        {
            return Ok(repo.UpdateBus(bus));
        }

    }
}
