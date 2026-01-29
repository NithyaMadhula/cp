using System;

namespace IGT.CustomerPortal.API.Model
{
    public class CustomIndexBasic
    {
        public int GameID { get; set; }
        public DateTime StartDate { get; set; }
        public string GameRefNumber { get; set; }
        public string GameName { get; set; }
        public string Price { get; set; }
        public string AverageSales { get; set; }
        public int Index { get; set; }
        public int StandardIndex { get; set; }
        public string AverageAllGames { get; set; }
        public string StandardDevAllGames { get; set; }
        public string AverageRoS { get; set; }
        public string RosIndex { get; set; }
        public string ActivePenetration { get; set; }
        public string SellThru { get; set; }
        public string PrimaryThemeName { get; set; }
        public string SecondaryThemeName { get; set; }
        public string PrimaryFeatureName { get; set; }
        public string SecondaryFeatureName { get; set; }
        public string PrimaryPlayStyleName { get; set; }
        public string SecondaryPlayStyleName { get; set; }
        public string LicensedProperty { get; set; }
    }

}
