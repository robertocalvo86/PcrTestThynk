using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PcrTestAPI.Models.Entities
{
    [Table("PcrTestVenueAllocations")]
    public class PcrTestVenueAllocation
    {
        public int PcrTestVenueAllocationId { get; set; }
 
        public DateTime AllocationDate { get; set; }

        public int PcrTestVenueId { get; set; }
        public PcrTestVenue PcrTestVenue { get; set; }

        public ICollection<PcrTestBooking> PcrTestBooking { get; set; }
    }
}
