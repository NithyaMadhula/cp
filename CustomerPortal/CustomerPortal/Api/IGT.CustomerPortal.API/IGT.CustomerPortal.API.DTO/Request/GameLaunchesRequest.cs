namespace IGT.CustomerPortal.API.DTO.Request
{
    public class GameLaunchesRequest
    {
        public string Customer { get; set; }
        public int? Year { get; set; }
        public int? TicketPrice { get; set; }
        public int? IncludePriorYear { get; set; }
        public int? ShowIndex { get; set; }
        public int? FiscalYear { get; set; }
    }
}
