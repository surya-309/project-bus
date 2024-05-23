using Busticket.Models;
using Busticket.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Busticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IDriverRepository repo;
        public DriverController(IDriverRepository repo)
        {
            this.repo = repo;
        }
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public IActionResult AddDriverDetails([FromBody]Driver driver)
        {
            repo.AddDriverDetails(driver);
            return StatusCode(StatusCodes.Status201Created);
        }

    }
}
