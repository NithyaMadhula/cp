namespace IGT.CustomerPortal.API.Model
{
    public class LotteryFYTDWeeklySalesAndPriorYearByTicketPrice
    {
        public int Year { get; set; }
        public decimal TicketPrice { get; set; }
        public decimal WeekSales { get; set; }
    }
}
