using System;

namespace Igt.InstantsShowcase.Models
{
    public class LotteryFytdWeeklySalesAndPriorYears
    {
        public DateTime WeekEndDate { get; set; }
        public decimal WeekSales { get; set; }
        public int Year { get; set; }
        public string Month { get; set; }
    }
}
