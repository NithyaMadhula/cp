using System;
using System.IO;

namespace IGT.CustomerPortal.API.Model
{
    public class GameSearch
    {
        public int GameID { get; set; }
        public string GameReferenceID { get; set; }
        public string GameName { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencySymbol { get; set; }
        public string TicketPrice { get; set; }
        public DateTime StartDate { get; set; }
        public int GameNumber { get; set; }

        string imageName;
        public string ImagePath { 
            get
            {
                string tmp = string.IsNullOrEmpty(imageName) ? null : Uri.EscapeUriString(imageName);
                if (string.IsNullOrEmpty(tmp)) return null;
                if (string.IsNullOrEmpty(ConceptsUrl)) return tmp;
                return Path.Combine(ConceptsUrl, tmp);
            }
            set { imageName = value; }
        }

        string subDivisionCode;
        public string SubDivisionCode { get { return subDivisionCode?.Trim(); } set { subDivisionCode = value; } }

        public int PrimaryThemeID { get; set; }
        public string PrimaryThemeName { get; set; }
        public string Theme { get; set; }
        public int SecondaryThemeID { get; set; }
        public string SecondaryThemeName { get; set; }
        public int PrimaryFeatureID { get; set; }
        public string PrimaryFeatureName { get; set; }
        public string Feature { get; set; }
        public int SecondaryFeatureID { get; set; }
        public string SecondaryFeatureName { get; set; }

        public decimal CurrentYearSales { get; set; }
        public decimal LastYearSales { get; set; }
        public decimal Last2YearSales { get; set; }

        public string Index { get; set; }
        public string IsFeatured { get; set; }
        public static string ConceptsUrl { get; set; }
    }
}
