using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PcrTestAPI.Dto
{
    public class Booking
    {
        public int BookingId { get; set; }
        public string Date { get; set; }
        public string Venue { get; set; }
        public string Status { get; set; }
        public string LastChange { get; set; }
        public string Result { get; set; }
        public string ResultDate { get; set; }
    }
}
