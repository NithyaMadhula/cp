namespace Igt.InstantsShowcase.Models
{
    public class WeeklySalesPenetration
    {
        public int GameID { get; set; }
        public int GameNumber { get; set; }
        public string GameName { get; set; }
        public decimal TicketPrice { get; set; }
        public int ActivatedRetailerCount { get; set; }
        public int RetailerCount { get; set; }
        public int TotalRetailers { get; set; }
        public decimal CurrentPenetrationBasedOnActivations { get; set; }
        public decimal CurrentPenetration { get; set; }
        public decimal ActualPrintRun { get; set; }
        public decimal CurrentWeekValidations { get; set; }
        public decimal TotalValidations { get; set; }
        public string TooltipInfo { get; set; }
        public string TooltipConfirmedInfo { get; set; }
        public decimal PenPercentage { get; set; }
    }
}
