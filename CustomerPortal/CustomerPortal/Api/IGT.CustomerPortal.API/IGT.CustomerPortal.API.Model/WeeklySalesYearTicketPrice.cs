using System;

namespace IGT.CustomerPortal.API.Model
{
    public class WeeklySalesYearTicketPrice
    {
        public DateTime WeekEndDate { get; set; }
        public decimal WeekSales { get; set; }
        public int Year { get; set; }
        public string Month { get; set; }
        public decimal TicketPrice { get; set; }
    }
}
