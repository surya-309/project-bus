using Busticket.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Busticket.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Busticket.Repository
{
    public class BookingRepository : IBookingRepository
    {
      

        BusTicketDbContext obj = new BusTicketDbContext();


        
        public string BookTicket(List<Bookings> bookings , string email)
        {
             var user = obj.Users.FirstOrDefault(x=>x.Email == email);

          
             

            foreach(var i  in bookings)
            {
                Bookings temp = new Bookings();
                temp.UserId = user.Id;
                temp.Name = i.Name;
                var city = obj.BusDetails.Where(x => x.From == i.From && x.To == i.To).FirstOrDefault();
                temp.BusId = city.Id;
                temp.From = i.From;
                temp.To = i.To;
                temp.Date = i.Date;
                temp.TotalPrice = city.price;
                temp.NoofTickets = i.NoofTickets;
                obj.Bookings.Add(temp);
                obj.SaveChanges();
            }
            var bus = bookings[0];
            var seatsavailable = obj.BusDetails.Where(u=>u.From == bus.From &&  u.To == bus.To).FirstOrDefault();
            seatsavailable.AvailableSeats = seatsavailable.AvailableSeats - bookings.Count;
            obj.SaveChanges();
            
           
            
            
            
            return ("Booked");
            
        }
        public void DeleteExpired()
        {
            var expiredbookings = obj.Bookings.Where(b => b.Date < DateTime.Now.AddMinutes(-1));
            if (expiredbookings.Any())
            {
                obj.Bookings.RemoveRange(expiredbookings);
                obj.SaveChanges();
            }
        }
        

       
    }
}