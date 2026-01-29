namespace Igt.InstantsShowcase.Models
{
    public class ConceptDetailedGameSearchRequest
    {
        public string GameName { get; set; }
        public int? TicketPrice { get; set; }
        public int? Theme { get; set; }
        public int? Color { get; set; }
        public int? PlayStyle { get; set; }
        public int? Feature { get; set; }
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
        public string CurrencyCode { get; set; }
    }
}
