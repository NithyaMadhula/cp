using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DTO.Request
{
    public class PrizeStructureProfileRequest
    {
        public string CustomerCode { get; set; }
        public string CustomerCodes { get; set; }
        public int TicketPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } = DateTime.Now;
        public string ExcludeGameID { get; set; } = null;
    }
}
