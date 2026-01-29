using System.ComponentModel.DataAnnotations;

namespace Igt.InstantsShowcase.Models
{
    public class DashboardCurrentRequest
    {
        [Required]
        public int? YearType { get; set; }
        public string Customer { get; set; }
        public decimal? TicketPrice { get; set; }
    }
}
