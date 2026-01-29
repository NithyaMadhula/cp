namespace Igt.InstantsShowcase.Models
{
    public class GameSales
    {
        public int WeekNumber { get; set; }
        public string WeekEnding { get; set; }
        public decimal Sales { get; set; }
        public string AccumSellThru { get; set; }
        public int RunningWeeksRemaining { get; set; }
        public int EstimatedWeeksRemaining { get; set; }
    }
}
