using Busticket.Data;
using Busticket.Exceptions;
using Busticket.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Busticket.Repository
{
    public class UserRepository : IUserRepository
    {
        private IConfiguration _config;
        public UserRepository(IConfiguration config)
        {
            _config = config;

        }
        

        BusTicketDbContext obj = new BusTicketDbContext();
        public string AddUser(Users user)
        {
            var existuser = obj.Users.FirstOrDefault(x => x.Email == user.Email);
            if (existuser != null)
            {
                return ("Email Exists");
            }
            obj.Users.Add(user);
            obj.SaveChanges();
            return ("Added user");
            
        }

        public List<Users> GetAll()
        {
            var res = obj.Users.ToList();
            return (res);
        }

        public string Login(Users user)
        {
            var currentuser = obj.Users.FirstOrDefault(x=>x.Email == user.Email);
            if (currentuser == null)
            {

                throw new UserNotFoundException("Invalid Email Id");
            }
            

            var Securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var Credentials = new SigningCredentials(Securitykey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role,currentuser.Role)
     

                

            };
            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT: Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: Credentials);
            var jwttoken = new JwtSecurityTokenHandler().WriteToken(token);
            return (jwttoken);
        }
        public string Cancel(string name, string email)
        {
            var currentuser = obj.Users.Where(x => x.Email == email).FirstOrDefault();
            var bookingsname = obj.Bookings.FirstOrDefault(b => b.Name == name);
            if(bookingsname == null)
            {
            throw new UserNotFoundException("User with the name not exists");

            }
            else
            {

            if (bookingsname.Name == name && currentuser.Id == bookingsname.UserId)
            { 

                var busseat = obj.BusDetails.Where(x=>x.Id == bookingsname.BusId).FirstOrDefault();
                busseat.AvailableSeats = busseat.AvailableSeats + 1;
                obj.Bookings.Remove(bookingsname);
                
                obj.SaveChanges();
                return ("Canceled");
            }
                return ("cancleed");
            }
            //return ("BadReuest");




        }
        public List<Bookings> getmyticket(string email)
        {
            var currentuser = obj.Users.Where(x => x.Email == email).FirstOrDefault();
            var userid = currentuser.Id;
            var bookingList = obj.Bookings.Where(b => b.UserId == userid)
       .Select(b => new Bookings
       {
           Id = b.Id,
           Name = b.Name,
           Date = b.Date,
           UserId = b.UserId,
           From = b.From,
           To = b.To,
           BusId = b.BusId,
           NoofTickets = b.NoofTickets,
           TotalPrice = b.TotalPrice
       })
       .ToList();

            return bookingList;



        }
        public List<Bookings> getAllTickets()
        {
            var lis = obj.Bookings.Select(b => new Bookings
            {
                Id = b.Id,
                Name = b.Name,
                Date = b.Date,
                UserId = b.UserId,
                From = b.From,
                To = b.To,
                BusId = b.BusId,
                NoofTickets = b.NoofTickets,
                TotalPrice = b.TotalPrice

            }).ToList();
            return lis;
        }
    }
    
}
