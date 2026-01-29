using System;

namespace Igt.InstantsShowcase.Models
{
    public class GameFeatured
    {
        public int GameID { get; set; }
        public string GameNumber { get; set; }
        public DateTime StartDate { get; set; }
        public string GameReferenceID { get; set; }
        public string GameName { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencySymbol { get; set; }
        string imageName;
        public string ImagePath
        {
            get
            {
                string tmp = string.IsNullOrEmpty(imageName) ? null : Uri.EscapeUriString(imageName);
                if (string.IsNullOrEmpty(tmp)) return null;
                return tmp;
            }
            set { imageName = value; }
        }
        string subDivisionCode;
        public string SubDivisionCode { get { return subDivisionCode?.Trim(); } set { subDivisionCode = value; } }
        public int IsWorkingPapers { get; set; }
    }
}