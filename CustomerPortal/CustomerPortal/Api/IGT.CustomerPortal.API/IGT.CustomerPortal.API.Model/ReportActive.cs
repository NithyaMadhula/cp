using System;

namespace IGT.CustomerPortal.API.Model
{
    public class ReportActive
    {
        public int GameID { get; set; }
        public string GameReference { get; set; }
        public string GameName { get; set; }
        public DateTime StartDate { get; set; }
        public decimal TicketPrice { get; set; }
        public int TicketsOrdered { get; set; }
        public int TicketsReceived { get; set; }
        public int NumberWeeksOnSale { get; set; }
        public DateTime WeekEndDate { get; set; }
        public decimal CurrWeekSales { get; set; }
        public int TicketQtyReceived { get; set; }
        public decimal TicketQtyRemaining { get; set; }
        public decimal SalesToDate { get; set; }
        public decimal AverageSales { get; set; }
        public decimal SellThru { get; set; }
        public decimal WeeksRemaining { get; set; }
        public decimal Week13Average { get; set; }
        public string Week13SellThru { get; set; }
        public string WeeksRemaining13WeekAverage { get; set; }
        public string NumberOfWeeks90SellThru { get; set; }
        public string NumberOfWeeks80SellThru { get; set; }
    }
}
