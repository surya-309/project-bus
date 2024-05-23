namespace Busticket.Exceptions
{
    public class UserNotFoundException : ApplicationException
    {
        public UserNotFoundException(string msg) : base(msg)
        {
            
        }
        public UserNotFoundException()
        {
            
        }
    }
}
