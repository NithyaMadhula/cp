namespace IGT.CustomerPortal.API.Model
{
    public class GamePrizeStructure
    {
        public int GameID { get; set; }
        public int PrizeID { get; set; }
        public string GameReferenceID { get; set; }
        public string NumberOfPrizes { get; set; }
        public decimal PrizeAmount { get; set; }
        public string PrizeOdds { get; set; }
        public string PrizePayout { get; set; }
        public string PrizeDescription { get; set; }
        public string ActualValue { get; set; }
        public int TopPrize { get; set; }
        public string PrizeTypeName { get; set; }
        public int PrizeTypeID { get; set; }

}
}
