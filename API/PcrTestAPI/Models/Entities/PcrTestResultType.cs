using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PcrTestAPI.Models.Entities
{
    [Table("PcrTestResultTypes")]
    public class PcrTestResultType
    {
        public int PcrTestResultTypeId { get; set; }
        public string Name { get; set; }

        public ICollection<PcrTestResult> PcrTestResult { get; set; }
    }
}
