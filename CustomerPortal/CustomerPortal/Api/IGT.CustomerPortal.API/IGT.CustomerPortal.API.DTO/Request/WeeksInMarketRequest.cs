namespace IGT.CustomerPortal.API.DTO.Request
{
    public class WeeksInMarketRequest
    {
        public string Customer { get; set; }
        public string EndOfWeek { get; set; }
        public decimal TicketPrice { get; set; }
    }
}
