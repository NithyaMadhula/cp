namespace IGT.CustomerPortal.API.Model
{
    public class CustomIndexAdvanced : CustomIndexBasic
    {
        public string TopPrize { get; set; }
        public string TopPrizeName { get; set; }
        public decimal TopPrizeAmt { get; set; }
        public int NumberOfPrizes { get; set; }
    }
}
