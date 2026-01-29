using System;
using System.IO;

namespace IGT.CustomerPortal.API.Model
{
    public class DetailedGameSearch
    {
        public int GameID { get; set; }
        public int GameNumber { get; set; }
        public DateTime StartDate { get; set; }
        public int LotteryID { get; set; }
        public string GameReferenceID { get; set; }
        public string GameName { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencySymbol { get; set; }
        public string TicketPrice { get; set; }
        public int TicketsReceived { get; set; }
        public int TicketsOrdered { get; set; }
        public int? TicketsPerBook { get; set; }
        public decimal Odds { get; set; }
        public decimal PrizePayoutPercent { get; set; }
        public string PaperStock { get; set; }
        public string Orientation { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
        public int NumPlayAreas { get; set; }
        public int? NumPlayStyle { get; set; }
        public string LicensedProperty { get; set; }
        public string MultipleScenes { get; set; }
        public int NumChancesToWin { get; set; }
        public int? NumCallouts { get; set; }
        public int? DominantColorID { get; set; }
        public string SecondChance { get; set; }
        public string CoreGame { get; set; }
        public string GameFamily { get; set; }
        public string MultiColorImaging { get; set; }
        public string LowMarquee { get; set; }
        public string Spotlight { get; set; }
        public string ProprietaryID { get; set; }
        public int? PrimarySpecialtyPrintingFeatureID { get; set; }
        public string GameNameInEnglish { get; set; }
        public string LowTopPrize { get; set; }
        public string LimitedTier { get; set; }
        public decimal? CalcOdds { get; set; }
        public decimal CalcPrizePayoutPercent { get; set; }
        public string NoBreakeven { get; set; }
        public string BusinessName { get; set; }

        string currencyType;
        public string CurrencyType { get { return currencyType?.Trim(); } set { currencyType = value; } }

        public string ProprietaryName { get; set; }
        public string PrimaryThemeName { get; set; }
        public string SecondaryThemeName { get; set; }
        public string Theme { get; set; }
        public string PrimaryFeatureName { get; set; }
        public string SecondaryFeatureName { get; set; }
        public string Feature { get; set; }
        public string PlayStyle { get; set; }
        public string PrimaryPlayStyleName { get; set; }
        public string SecondaryPlayStyleName { get; set; }
        public string PrimaryColorName { get; set; }
        public string SecondaryColorName { get; set; }
        public string Color { get; set; }
        public string PrimarySpecialtyFeatureName { get; set; }
        public string SecondarySpecialtyFeatureName { get; set; }
        public string SpecialtyOption { get; set; }

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
        public string IsTopPrize { get; set; }
        public decimal? PrizeAmount { get; set; }
        public int? NumberOfPrizes { get; set; }
        public string PrizeTypeName { get; set; }

        public decimal? CurrentYearSales { get; set; }
        public decimal? LastYearSales { get; set; }
        public decimal? Last2YearSales { get; set; }

        public string Index { get; set; }
        public string IsFeatured { get; set; }

        public static string ConceptsUrl { get; set; }
        public int IsWorkingPapers { get; set; }
    }
}
