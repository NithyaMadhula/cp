using System;

namespace Igt.InstantsShowcase.Models
{
    public class ConceptDetailedGameSearch
    {
        public int ConceptID { get; set; }
        public string GameNumber { get; set; }
        public DateTime StartDate { get; set; }
        public string GameReferenceID { get; set; }
        public string GameName { get; set; }
        public string GameNameInEnglish { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencySymbol { get; set; }
        public string TicketPrice { get; set; }
        public string PaperStock { get; set; }
        public string Orientation { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int NumPlayAreas { get; set; }
        public int? NumPlayStyle { get; set; }
        public string MultipleScenes { get; set; }
        public string GameFamily { get; set; }
        public string MultiColorImaging { get; set; }
        public string PrimaryThemeName { get; set; }
        public string SecondaryThemeName { get; set; }
        public string PrimaryFeatureName { get; set; }
        public string SecondaryFeatureName { get; set; }
        public string PrimaryPlayStyleName { get; set; }
        public string SecondaryPlayStyleName { get; set; }
        public string PrimaryColorName { get; set; }
        public string SecondaryColorName { get; set; }
        public string PrimarySpecialtyFeatureName { get; set; }
        public string SecondarySpecialtyFeatureName { get; set; }
        string imageName;
        public string ImgName
        {
            get
            {
                string tmp = string.IsNullOrEmpty(imageName) ? null : Uri.EscapeUriString(imageName);
                if (string.IsNullOrEmpty(tmp)) return null;
                return tmp;
            }
            set { imageName = value; }
        }
        public string IsFeatured { get; set; }
        public string BusinessName { get; set; }
        public int IsWorkingPapers { get; set; }
        public string Theme { get; set; }
        public string PlayAction { get; set; }
        public string Color { get; set; }
        public string SpecialtyOption { get; set; }
        public string PrintingOptions { get { return SpecialtyOption; } }
    }
}
