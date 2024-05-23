namespace Busticket.Exceptions
{
    public class BusNotFound :ApplicationException
    {
        public BusNotFound( string msg) : base(msg) 
        {
           
        }
        public BusNotFound()
        {
            
        }
    }
}
