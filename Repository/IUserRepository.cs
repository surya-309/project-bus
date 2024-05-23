using Busticket.Models;

namespace Busticket.Repository
{
    public interface IUserRepository
    {
        public string AddUser(Users user);
        public List<Users> GetAll();
        public string Login(Users user);
        public string Cancel(string name, string email);
        public List<Bookings> getmyticket(string email);
        public List<Bookings> getAllTickets();  
    }
}
