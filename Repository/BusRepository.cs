using Busticket.Data;
using Busticket.Exceptions;
using Busticket.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.ComponentModel;

namespace Busticket.Repository
{
    public class BusRepository : IBusRepository
    {
        BusTicketDbContext obj = new BusTicketDbContext();  
        public async void AddBus(Bus bus)
        {
            await obj.BusDetails.AddAsync(bus);   
           await  obj.SaveChangesAsync();



        }

        public List<Bus> GetAllBuses()
        {
           
            var buslist = obj.BusDetails.ToList();




            return (buslist); ;
            
        }
        public string UpdateBus( Bus bus)
        {
            var ubus = obj.BusDetails.FirstOrDefault(x => x.Id == bus.Id);
            if (ubus == null)
            {
                throw new BusNotFound("Bus with this id not found");
            }
            else
            {
                ubus.From = bus.From;
                ubus.To = bus.To;
                ubus.price = bus.price;
                ubus.time = bus.time;
                obj.SaveChanges();
                return ("updated");

            }
            
        }
    }
}
