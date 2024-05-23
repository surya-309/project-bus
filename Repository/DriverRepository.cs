using Busticket.Data;
using Busticket.Models;

namespace Busticket.Repository
{
    public class DriverRepository : IDriverRepository
    {
        BusTicketDbContext obj =  new BusTicketDbContext(); 

        public void AddDriverDetails(Driver driver) { 
            obj.DriverDetails.Add(driver);
            obj.SaveChanges();  
            
        }
    }
}
