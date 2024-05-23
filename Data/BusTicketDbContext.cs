using Busticket.Models;
using Microsoft.EntityFrameworkCore;

namespace Busticket.Data
{
    public class BusTicketDbContext : DbContext

    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Bookings> Bookings { get; set; }   
        public DbSet<Bus> BusDetails { get; set; }
        public DbSet<Driver> DriverDetails { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server = (localdb)\MSSQLLocalDB; Database = Busticket");
        }

    }
}
