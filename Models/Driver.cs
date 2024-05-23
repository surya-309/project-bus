namespace Busticket.Models
{
    public class Driver
    {
        public int Id { get; set; }
        public string DriverName { get; set; }
        public string Contact { get; set; }
        public Bus Bus { get; set; }    
    }
}