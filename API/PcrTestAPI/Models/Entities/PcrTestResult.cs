using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PcrTestAPI.Models.Entities
{
    [Table("PcrTestResults")]
    public class PcrTestResult
    {
        public int PcrTestResultId { get; set; }
        public DateTime ResultDate { get; set; }

        public int PcrTestResultTypeId { get; set; }
        public PcrTestResultType PcrTestResultType { get; set; }

        public ICollection<PcrTestBooking> PcrTestBooking { get; set; }
    }
}
