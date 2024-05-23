using System.Text.Json.Serialization;

namespace Busticket.Models
{
    public class Bus
    {
        public int Id { get; set; }
        public string BusNumber { get; set; }
        public int NoSeats { get; set; }
        public string Type { get; set; }
        public int price { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        [JsonIgnore]
        public List<Bookings> Bookings { get; set; }
        public int DriverId { get; set; }
        [JsonIgnore]
        public Driver Driver { get; set; }
        public int AvailableSeats { get; set; }
        public string time {  get; set; }
    }
}