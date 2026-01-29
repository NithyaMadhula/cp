namespace IGT.CustomerPortal.API.DTO.Request
{
    public class ReportClosedRequest
    {
        public string Customer { get; set; }
        public decimal TicketPrice { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
