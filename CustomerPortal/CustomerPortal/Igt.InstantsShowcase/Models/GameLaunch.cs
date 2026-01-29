using System;
using System.IO;

namespace Igt.InstantsShowcase.Models
{
    public class GameLaunch
    {
        public int GameID { get; set; }
        public string GameReferenceID { get; set; }
        public int GameNumber { get; set; }
        public string GameName { get; set; }
        public DateTime StartDate { get; set; }
        public decimal TicketPrice { get; set; }
        string imageName;
        public string ImgPath
        {
            get
            {
                string tmp = string.IsNullOrEmpty(imageName) ? null : imageName;
                if (string.IsNullOrEmpty(tmp)) return null;
                if (string.IsNullOrEmpty(ConceptsUrl)) return tmp;
                return Path.Combine(ConceptsUrl, Uri.EscapeUriString(Path.GetFileName(tmp)));
            }
            set { imageName = value; }
        }
        public int Year { get; set; }
        public string PeriodType { get; set; }
        public string Index { get; set; }
        public static string ConceptsUrl { get; set; }
    }
}
