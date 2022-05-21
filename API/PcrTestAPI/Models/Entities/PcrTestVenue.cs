using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PcrTestAPI.Models.Entities
{
    [Table("PcrTestVenues")]
    public class PcrTestVenue
    {
        public int PcrTestVenueId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int NumberOfSpaces { get; set; }

        public ICollection<PcrTestVenueAllocation> PcrTestVenueAllocations { get; set; }
    }
}
