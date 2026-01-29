using System.Collections.Generic;

namespace IGT.CustomerPortal.API.Model
{
    public class ReportTop
    {
        public decimal TicketPrice { get; set; }
        public string GameID { get; set; }
        public string GameName { get; set; }
        public string LaunchDate { get; set; }
        public decimal WeeksRemaining { get; set; }
        public int WeeksOnSale { get; set; }
        public Dictionary<string, decimal> Dates { get; set; }
    }
}
