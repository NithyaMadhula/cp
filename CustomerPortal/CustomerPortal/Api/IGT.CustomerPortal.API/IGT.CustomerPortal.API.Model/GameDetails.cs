using System;
using System.IO;

namespace IGT.CustomerPortal.API.Model
{
    public class GameDetails
    {
        public string GameID { get; set; }
        public string GameNumber { get; set; }
        public string StartDate { get; set; }
        public string LotteryID { get; set; }
        public string GameReferenceID { get; set; }
        public string GameName { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencySymbol { get; set; }
        public string TicketPrice { get; set; }
        public string TicketsReceived { get; set; }
        public string TicketsOrdered { get; set; }
        public string TicketsPerBook { get; set; }
        public string VendorID { get; set; }
        public string Odds { get; set; }
        public string PrizePayoutPercent { get; set; }
        public string PaperStock { get; set; }
        public string Orientation { get; set; }
        public string Height { get; set; }
        public string Width { get; set; }
        public string NumPlayAreas { get; set; }
        public string NumPlayStyle { get; set; }
        public string LicensedProperty { get; set; }
        public string MultipleScenes { get; set; }
        public string NumChancesToWin { get; set; }
        public string NumCallouts { get; set; }
        public string Comments { get; set; }
        public string EnteredBy { get; set; }
        public string DateInput { get; set; }
        public string CurrencyID { get; set; }
        public string DominantColorID { get; set; }
        public string DateExcluded { get; set; }
        public string ExcludeReason { get; set; }
        public string PrimaryFeatureID { get; set; }
        public string PrimaryThemeID { get; set; }
        public string PrimaryPlayStyleID { get; set; }
        public string SecondChance { get; set; }
        public string SalesTypeID { get; set; }
        public string CoreGame { get; set; }
        public string TicketsReceivedUpdated { get; set; }
        public string GameFamily { get; set; }
        public string MultiColorImaging { get; set; }
        public string LowMarquee { get; set; }
        public string Spotlight { get; set; }
        public string ProprietaryID { get; set; }
        public string PrimarySpecialtyPrintingFeatureID { get; set; }
        public int IsWorkingPapers { get; set; }
        public string GameNameInEnglish { get; set; }
        public string LowTopPrize { get; set; }
        public string LimitedTier { get; set; }
        public string CalcOdds { get; set; }
        public string CalcPrizePayoutPercent { get; set; }
        public string NoBreakeven { get; set; }
        public string BusinessName { get; set; }
        public string VendorName { get; set; }
        public string CurrencyType { get; set; }
        public string ProprietaryName { get; set; }
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
                if (string.IsNullOrEmpty(ConceptsUrl)) return tmp;
                return Path.Combine(ConceptsUrl, tmp);
            }
            set { imageName = value; }
        }

        string subDivisionCode;
        public string SubDivisionCode { get { return subDivisionCode?.Trim(); } set { subDivisionCode = value; } }
        public string SubDivisionName { get; set; }
        public string Theme { get; set; }
        public string Feature { get; set; }
        public string PlayStyle { get; set; }
        public string Color { get; set; }

        public string IsTopPrize { get; set; }
        public decimal PrizeAmount { get; set; }
        public int NumberOfPrizes { get; set; }
        public string PrizeTypeName { get; set; }
        public decimal CurrentYearSales { get; set; }
        public decimal LastYearSales { get; set; }
        public decimal Last2YearSales { get; set; }

        public string Index { get; set; }
        public static string ConceptsUrl { get; set; }
    }
}
