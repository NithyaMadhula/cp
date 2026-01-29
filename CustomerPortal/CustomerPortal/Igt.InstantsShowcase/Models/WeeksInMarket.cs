using System;

namespace Igt.InstantsShowcase.Models
{
    public class WeeksInMarket
    {
        public int GameID { get; set; }
        public int GameNumber { get; set; }
        public string GameName { get; set; }
        public decimal TicketPrice { get; set; }
        public int NumberOfTickets { get; set; }
        public int Quantity { get; set; }
        public DateTime WeekEnding { get; set; }
        public int WeekNumber { get; set; }
        public int ActivatedRetailerCount { get; set; }
        public int RetailerCount { get; set; }
        public int TotalRetailers { get; set; }
        public decimal CurrentPenetrationBasedOnActivations { get; set; }
        public decimal CurrentPenetration { get; set; }
        public decimal ValidationAmt { get; set; }
        public decimal ValidationTotal { get; set; }
        public decimal RunningTotal { get; set; }
        public decimal InvRemaining { get; set; }
        public string TooltipInfo { get; set; }
        public string TooltipConfirmedInfo { get; set; }
        public decimal PenPercentage { get; set; }
        public string BubbleLegend { get; set; }
        public string BubbleColor { get; set; }
    }
}
