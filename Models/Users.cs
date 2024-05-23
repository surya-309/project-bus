using System.Text.Json.Serialization;

namespace Busticket.Models
{
    public class Users
    {
        public int Id {  get; set; }
        
        public string Name {  get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; }
        public string Password { get; set; }
        [JsonPropertyName("PhnNo")]
        public string PhnNo { get; set; }
        public string Role { get; set; }
        [JsonIgnore]
        public List<Bookings> Bookings { get; set; }
        
    }
}