namespace IGT.CustomerPortal.API.DTO.Request
{
    public class GameSearchRequest
    {
        public string Customer  { get; set; }
        public string GameName { get; set; }
        public int? Year { get; set; }
        public int? TicketPrice { get; set; }
        public string Theme { get; set; }
        public string Color { get; set; }
        public string PlayStyle { get; set; }
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
    }
}