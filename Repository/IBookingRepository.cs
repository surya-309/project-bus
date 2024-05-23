using Busticket.Models;

namespace Busticket.Repository
{
    public interface IBookingRepository
    {
        public string BookTicket(List<Bookings> bookings,string email);
        public void DeleteExpired();
       
        
    }
}
