using System.ComponentModel.DataAnnotations;

namespace IGT.CustomerPortal.API.DTO.Request
{
    public class DashboardCurrentRequest
    {
        [Required]
        public int? YearType { get; set; }
        public string Customer { get; set; }
        public decimal? TicketPrice { get; set; }
    }
}
