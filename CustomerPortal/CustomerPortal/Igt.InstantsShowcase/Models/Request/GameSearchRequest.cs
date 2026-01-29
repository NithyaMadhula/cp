using System;

namespace Igt.InstantsShowcase.Models
{
    public class GameSearchRequest
    {
        public string Customer  { get; set; }
        public string GameName { get; set; }
        public int? TicketPrice { get; set; }
        public string ThemeIDs { get; set; }
        public string ColorIDs { get; set; }
        public string PlayStyleIDs { get; set; }
        public string FeatureIDs { get; set; }
        public string SpecialtyOptionIDs { get; set; }
        public string PaperStockCategoryIDs { get; set; }
        public string JurisdictionIDs { get; set; }        
        public string SortColumn { get; set; }
        public string SortDirection { get; set; }
        public int? MinimumPerformance { get; set; }
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}