using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PcrTestAPI.Models.Entities
{
    [Table("PcrTestBookings")]
    public class PcrTestBooking
    {
        public int PcrTestBookingId { get; set; }
        public string IdentityCardNumber { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        public int PcrTestVenueAllocationId { get; set; }
        public PcrTestVenueAllocation PcrTestVenueAllocation { get; set; }

        public int PcrTestBookingStatusId { get; set; }
        public PcrTestBookingStatus PcrTestBookingStatus { get; set; }

        public int? PcrTestResultId { get; set; }
        public PcrTestResult PcrTestResult { get; set; }
    }
}
