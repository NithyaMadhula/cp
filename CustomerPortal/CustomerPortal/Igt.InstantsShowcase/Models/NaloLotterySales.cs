using System;

namespace Igt.InstantsShowcase.Models
{
    public class NaloLotterySales
    {
        public int LotteryId { get; set; }
        public string BusinessName { get; set; }
        public decimal RevenueYTDCurrent { get; set; }
        public decimal RevenueYTDPrior { get; set; }
        public decimal PercentChange { get; set; }
        public DateTime MaxSalesDate { get; set; }
    }
}
