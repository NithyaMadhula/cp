using System.Collections.Generic;

namespace Igt.InstantsShowcase.Models
{
    public class ChartIndexed
    {
        public string Group { get; set; }
        public int AverageIndex { get; set; }
        public int GamesCount { get; set; }
        public Dictionary<string, string> TicketPrices { get; set; }
    }
}
