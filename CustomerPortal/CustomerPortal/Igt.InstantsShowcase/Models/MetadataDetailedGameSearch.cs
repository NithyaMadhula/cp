using System;
using System.Collections.Generic;
using System.Linq;

namespace Igt.InstantsShowcase.Models
{
    public class MetadataDetailedGameSearch
    {
        public MetadataDetailedGameSearch()
        {

        }

        public MetadataDetailedGameSearch(IEnumerable<DetailedGameSearch> list)
        {
            TicketPrice = list.Where(i => !string.IsNullOrEmpty(i.TicketPrice)).Select(i => i.TicketPrice).Distinct();
            Orientation = list.Where(i => !string.IsNullOrEmpty(i.Orientation)).Select(i => i.Orientation).Distinct();
            PrimaryColorName = list.Where(i => !string.IsNullOrEmpty(i.PrimaryColorName)).Select(i => i.PrimaryColorName).Distinct();
            StartDate = list.Select(i => i.StartDate).Distinct();
            TicketsOrdered = list.Select(i => i.TicketsOrdered).Distinct();
            PaperStock = list.Where(i => !string.IsNullOrEmpty(i.PaperStock)).Select(i => i.PaperStock).Distinct();
            Height = list.Where(i => i.Height.HasValue).Select(i => i.Height ?? 0).Distinct();
            Width = list.Where(i => i.Width.HasValue).Select(i => i.Width ?? 0).Distinct();
            NumPlayAreas = list.Select(i => i.NumPlayAreas).Distinct();
            LicensedProperty = list.Select(i => i.LicensedProperty).Distinct();
            MultipleScenes = list.Select(i => i.MultipleScenes).Distinct();
            NumChancesToWin = list.Select(i => i.NumChancesToWin).Distinct();
            SecondChance = list.Select(i => i.SecondChance).Distinct();
            GameFamily = list.Select(i => i.GameFamily).Distinct();
            LowMarquee = list.Select(i => i.LowMarquee).Distinct();
            PrimarySpecialtyPrintingFeatureID = list.Where(i => i.PrimarySpecialtyPrintingFeatureID.HasValue).Select(i => i.PrimarySpecialtyPrintingFeatureID ?? 0).Distinct();
            LowTopPrize = list.Select(i => i.LowTopPrize).Distinct();
            LimitedTier = list.Select(i => i.LimitedTier).Distinct();
            CalcOdds = list.Where(i => i.CalcOdds.HasValue).Select(i => i.CalcOdds ?? 0).Distinct();
            CalcPrizePayoutPercent = list.Select(i => i.CalcPrizePayoutPercent).Distinct();
            PrimaryThemeName = list.Where(i => !string.IsNullOrEmpty(i.PrimaryThemeName)).Select(i => i.PrimaryThemeName).Distinct();
            PrimaryFeatureName = list.Where(i => !string.IsNullOrEmpty(i.PrimaryFeatureName)).Select(i => i.PrimaryFeatureName).Distinct();
            PrimaryPlayStyleName = list.Where(i => !string.IsNullOrEmpty(i.PrimaryPlayStyleName)).Select(i => i.PrimaryPlayStyleName).Distinct();
            SecondaryColorName = list.Where(i => !string.IsNullOrEmpty(i.SecondaryColorName)).Select(i => i.SecondaryColorName).Distinct();
            //SubDivisionCode = list.Where(i => !string.IsNullOrEmpty(i.SubDivisionCode)).Select(i => i.SubDivisionCode).Distinct();
            SubDivisionName = list.Where(i => !string.IsNullOrEmpty(i.SubDivisionName)).Select(i => i.SubDivisionName).Distinct();
            IsTopPrize = list.Select(i => i.IsTopPrize).Distinct();
            PrizeAmount = list.Where(i => i.PrizeAmount.HasValue).Select(i => i.PrizeAmount ?? 0).Distinct();
            NumberOfPrizes = list.Where(i => i.NumberOfPrizes.HasValue).Select(i => i.NumberOfPrizes ?? 0).Distinct();
            PrizeTypeName = list.Where(i => !string.IsNullOrEmpty(i.PrizeTypeName)).Select(i => i.PrizeTypeName).Distinct();
            Index = list.Where(i => !string.IsNullOrEmpty(i.Index)).Select(i => i.Index).Distinct();
            IsFeatured = list.Select(i => i.IsFeatured).Distinct();
            Odds = list.Select(i => i.Odds).Distinct();
            PrizePayoutPercent = list.Select(i => i.PrizePayoutPercent).Distinct();
        }

        public IEnumerable<string> TicketPrice { get; set; }
        public IEnumerable<string> Orientation { get; set; }
        public IEnumerable<string> PrimaryColorName { get; set; }
        public IEnumerable<DateTime> StartDate { get; set; }
        public IEnumerable<int> TicketsOrdered { get; set; }
        public IEnumerable<decimal> Odds { get; set; }
        public IEnumerable<decimal>PrizePayoutPercent { get; set; }
        public IEnumerable<string> PaperStock { get; set; }
        public IEnumerable<int> Height { get; set; }
        public IEnumerable<int> Width { get; set; }
        public IEnumerable<int> NumPlayAreas { get; set; }
        public IEnumerable<string> LicensedProperty { get; set; }
        public IEnumerable<string> MultipleScenes { get; set; }
        public IEnumerable<int> NumChancesToWin { get; set; }
        public IEnumerable<string> SecondChance { get; set; }
        public IEnumerable<string> GameFamily { get; set; }
        public IEnumerable<string> LowMarquee { get; set; }
        public IEnumerable<int> PrimarySpecialtyPrintingFeatureID { get; set; }
        public IEnumerable<string> LowTopPrize { get; set; }
        public IEnumerable<string> LimitedTier { get; set; }
        public IEnumerable<decimal> CalcOdds { get; set; }
        public IEnumerable<decimal> CalcPrizePayoutPercent { get; set; }
        public IEnumerable<string> PrimaryThemeName { get; set; }
        public IEnumerable<string>  PrimaryFeatureName { get; set; }
        public IEnumerable<string> PrimaryPlayStyleName { get; set; }
        public IEnumerable<string> SecondaryColorName { get; set; }
        public IEnumerable<string> SubDivisionCode { get { return Customer; } }
        public IEnumerable<string> SubDivisionName { get; set; }
        public IEnumerable<string> IsTopPrize { get; set; }
        public IEnumerable<decimal> PrizeAmount { get; set; }
        public IEnumerable<int> NumberOfPrizes { get; set; }
        public IEnumerable<string> PrizeTypeName { get; set; }
        public IEnumerable<string>Index { get; set; }
        public IEnumerable<string> IsFeatured { get; set; }
        public IEnumerable<string> Customer { get; set; }
        public IEnumerable<string> Color { get { return PrimaryColorName; } }
        public IEnumerable<string> Theme { get { return PrimaryThemeName; } }
        public IEnumerable<string> PlayStyle { get { return PrimaryPlayStyleName; } }
        public IEnumerable<string> Jurisdiction { get { return SubDivisionCode; } }
    }
}
