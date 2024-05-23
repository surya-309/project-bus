using System.Text.Json.Serialization;

namespace Busticket.Models
{
    public class Bookings
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        [JsonIgnore]
        public Users User { get; set; }
        public int BusId { get; set; }
        [JsonIgnore]
        public Bus Bus { get; set; }
        public int? NoofTickets { get; set; }
        public int? TotalPrice { get; set; }



    }
}
