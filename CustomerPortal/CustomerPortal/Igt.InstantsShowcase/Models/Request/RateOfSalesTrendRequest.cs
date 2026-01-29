namespace Igt.InstantsShowcase.Models
{
    public class RateOfSalesTrendRequest
    {
        public string Customer { get; set; }
        public string StartDate { get; set; }
        public decimal TicketPrice { get; set; }
        public int IsExclude { get; set; }
    }
}
