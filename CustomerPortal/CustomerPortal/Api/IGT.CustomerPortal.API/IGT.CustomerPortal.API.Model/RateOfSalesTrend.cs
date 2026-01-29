namespace IGT.CustomerPortal.API.Model
{
    public class RateOfSalesTrend
    {
        public string TicketPrice { get; set; }
        public int GameNumber { get; set; }
        public int GameID { get; set; }
        public string StartDate { get; set; }
        public string WeekEnding { get; set; }
        public int WeekNumber { get; set; }
        public string PriceName { get; set; }
        public string GameName { get; set; }
        public decimal Rate { get; set; }
        public string TooltipInfo { get; set; }
        public string GroupBy { get; set; }
        public decimal PenPercentage { get; set; }
    }
}
