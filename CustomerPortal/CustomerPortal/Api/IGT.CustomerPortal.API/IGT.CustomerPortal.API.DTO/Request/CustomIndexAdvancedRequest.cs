using System;

namespace IGT.CustomerPortal.API.DTO.Request
{
    public class CustomIndexAdvancedRequest
    {
        public string Customer { get; set; }
        public int IndexWeek { get; set; }
        public string TicketPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ScoreMin { get; set; }
        public int ScoreMax { get; set; }
        public int IsExcludeCrossword { get; set; }
        public int IsExcludeBingo { get; set; }
        public int IsExcludeHoliday { get; set; }
        public int IsLicensedProperty { get; set; }
        public int ThemeID { get; set; }
        public int FeatureID { get; set; }
        public int PlayStyleID { get; set; }
        public string GameName { get; set; }
        public string TopPrizeAmt { get; set; }
    }
}
