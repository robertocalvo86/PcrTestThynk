using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PcrTestAPI.Models.Entities
{
    [Table("PcrTestBookingStatuses")]
    public class PcrTestBookingStatus
    {
        public int PcrTestBookingStatusId { get; set; }
        public string Name { get; set; }

        public ICollection<PcrTestBooking> PcrTestBooking { get; set; }
    }
}
