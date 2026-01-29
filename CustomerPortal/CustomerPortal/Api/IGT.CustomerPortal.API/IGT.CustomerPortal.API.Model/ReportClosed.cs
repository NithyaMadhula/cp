using System;

namespace IGT.CustomerPortal.API.Model
{
    public class ReportClosed
    {
        public int GameID { get; set; }
        public string GameReference { get; set; }
        public string GameName { get; set; }
        public DateTime LaunchDate { get; set; }
        public decimal TicketPrice { get; set; }
        public int TicketsOrdered { get; set; }
        public int TicketsReceived { get; set; }
        public int NumberWeeksOnSale { get; set; }
        public DateTime FinalWeekEndingDate { get; set; }
        public decimal FinalWeekSales { get; set; }
        public int TicketQtyReceived { get; set; }
        public decimal TicketQtyRemaining { get; set; }
        public decimal TotalSales { get; set; }
        public decimal AverageSales { get; set; }
        public string SellThru { get; set; }
        public string NumberOfWeeks90SellThru { get; set; }
        public string NumberOfWeeks80SellThru { get; set; }

    }
}
