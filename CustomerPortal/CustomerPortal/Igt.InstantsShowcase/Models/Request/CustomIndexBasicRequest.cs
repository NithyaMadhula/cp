using System;

namespace Igt.InstantsShowcase.Models
{
    public class CustomIndexBasicRequest
    {
        public string Customer { get; set; }
        public decimal TicketPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int IndexWeek { get; set; }
    }
}
