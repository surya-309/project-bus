using Busticket.Models;

namespace Busticket.Repository
{
    public interface IBusRepository
    {
        public void AddBus(Bus bus);
        public List<Bus> GetAllBuses();
        public string UpdateBus(Bus bus);
    }
}
