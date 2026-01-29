namespace Igt.InstantsShowcase.Models
{
    public class FytdWeeklySales
    {
        public decimal TicketPrice { get; set; }
        public int CurrentYear { get; set; }
        public decimal CurrentWeekSales { get; set; }
        public int PriorYear { get; set; }
        public decimal PriorWeekSales { get; set; }
    }
}
