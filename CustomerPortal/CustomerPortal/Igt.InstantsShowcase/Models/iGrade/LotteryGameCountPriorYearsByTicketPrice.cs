namespace Igt.InstantsShowcase.Models
{
    public class LotteryGameCountPriorYearsByTicketPrice
    {
        public int Year { get; set; }
        public decimal TicketPrice { get; set; }
        public int GameCount { get; set; }
        public string Tooltip { get; set; }
    }
}
