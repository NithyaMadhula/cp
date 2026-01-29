using System;
using System.Collections.Generic;

namespace IGT.CustomerPortal.API.Model
{
    public class LotteryTotalYTDSales
    {
        public LotteryTotalYTDSales()
        {
            WeeklySales = new Weeklysales();
            TicketBreakdown = new List<Ticketbreakdown>();
        }

        public Weeklysales WeeklySales { get; set; }

        public IList<Ticketbreakdown> TicketBreakdown { get; set; }
    }

    public class Weeklysales
    {
        public DateTime CurrWeek { get; set; }
        public decimal CurrWeekSales { get; set; }
        public decimal YTDSales { get; set; }
        public DateTime PriorYearWeek { get; set; }
        public decimal PriorYearWeekSales { get; set; }
        public decimal PriorYearYTDSales { get; set; }
        public decimal WeekDifference { get; set; }
        public string PercentChangeWeek { get; set; }
        public decimal YTDDifference { get; set; }
        public string PercentChangeYear { get; set; }
        public int Weeks { get; set; }
        public string CurrentYear { get; set; }
        public string StartMonthDay { get; set; }
        public string SalesType { get; set; }
    }

    public class Ticketbreakdown
    {
        public decimal TicketPrice { get; set; }
        public decimal CurrWeekSales { get; set; }
        public decimal YTDSales { get; set; }
        public string PercentSalesYTD { get; set; }
        public decimal PriorYearWeekSales { get; set; }
        public decimal PriorYearYTDSales { get; set; }
        public string PercentSalesPriorYTD { get; set; }
        public decimal WeekDifference { get; set; }
        public string PercentChangeWeek { get; set; }
        public decimal YTDDifference { get; set; }
        public string PercentChangeYear { get; set; }
    }

}
