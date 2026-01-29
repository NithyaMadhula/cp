namespace IGT.CustomerPortal.API.Model
{
    public class LotteryAverageSellingPrice
    {
        public decimal TotalSales { get; set; }
        public decimal TotalQuantity { get; set; }
        public decimal AveragePrice { get; set; }
        public int Year { get; set; }
    }
}
