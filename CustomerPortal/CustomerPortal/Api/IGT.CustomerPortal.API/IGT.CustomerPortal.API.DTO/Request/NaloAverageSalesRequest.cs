namespace IGT.CustomerPortal.API.DTO.Request
{
    public class NaloAverageSalesRequest
    {
        public string[] Customers { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string PriorStartDate { get; set; }
    }
}
