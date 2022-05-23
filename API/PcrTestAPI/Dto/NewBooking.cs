using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PcrTestAPI.Dto
{
    public class NewBooking
    {
        public int Venue { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string IdentityCardNumber { get; set; }
    }
}
