namespace Igt.InstantsShowcase.Models
{
    public class ReportPricePoint
    {
        public int GameID { get; set; }
        public string GameReferenceID { get; set; }
        public string GameName { get; set; }
        public decimal TicketPrice { get; set; }
        public string LaunchDate { get; set; }
        public int WeekNumber { get; set; }
        public string WeekEnding { get; set; }
        public decimal Sales { get; set; }
        public string AccumSellThru { get; set; }
        public decimal WeeksRemaining { get; set; }
    }
}
