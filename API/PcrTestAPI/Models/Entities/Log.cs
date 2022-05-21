using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace PcrTestAPI.Models.Entities
{
    [Table("__Logs")]
    public class __Log
    {
        public long __LogId { get; set; }
        public DateTime LogDate { get; set; }
        public string LogMessage { get; set; }
        public string LogLevel { get; set; }
        public string LogIP { get; set; }
        public string LogURL { get; set; }
        public string LogException { get; set; }
        public string LogUserID { get; set; }
        public string LogModule { get; set; }
        public string LogCallSite { get; set; }
        public string LogSessionID { get; set; }
    }
}
