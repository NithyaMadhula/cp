using System;

namespace IGT.CustomerPortal.API.Model
{
    public class LotteryFYTDWeeklySalesAndPriorYears
    {
        public DateTime WeekEndDate { get; set; }
        public decimal WeekSales { get; set; }
        public int Year { get; set; }
        public string Month { get; set; }
    }
}
