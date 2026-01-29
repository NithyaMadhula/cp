using System;

namespace IGT.CustomerPortal.API.Model
{
    public class NaloYTDSales
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
        public int CurrentYear { get; set; }
        public string StartMonthDay { get; set; }
        public string SalesType { get; set; }

    }
}
