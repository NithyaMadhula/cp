using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Models
{
    public class GameSearchResult
    {
        public int GameID { get; set; }
        public DateTime StartDate { get; set; }
        public string GameReferenceID { get; set; }
        public string GameName { get; set; }
        public decimal TicketPrice { get; set; }
        public string PaperStock { get; set; }
        public string BusinessName { get; set; }
        public string SubDivisionCode { get; set; }
        public string Theme { get; set; }
        public string Feature { get; set; }
        public string PlayStyle { get; set; }
        public string Color { get; set; }
        public string SpecialtyOption { get; set; }
        public string ImgName { get; set; }
        public string Index { get; set; }
    }
}
