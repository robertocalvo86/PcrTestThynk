using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PcrTestAPI.Dto
{
    public class Booking
    {
        public int BookingId { get; set; }
        public DateTime Date { get; set; }
        public string Venue { get; set; }
        public string Status { get; set; }
        public DateTime LastChange { get; set; }
        public string Result { get; set; }
        public DateTime ResultDate { get; set; }
    }
}
