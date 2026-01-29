using System;

namespace Igt.InstantsShowcase.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class ReportActive
    {
        /// <summary>
        /// 
        /// </summary>
        public int GameID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string GameReference { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string GameName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal TicketPrice { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int TicketsOrdered { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int TicketsReceived { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int NumberWeeksOnSale { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime WeekEndDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal CurrWeekSales { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int TicketQtyReceived { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal TicketQtyRemaining { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal SalesToDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal AverageSales { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal SellThru { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal WeeksRemaining { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal Week13Average { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Week13SellThru { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string WeeksRemaining13WeekAverage { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string NumberOfWeeks90SellThru { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string NumberOfWeeks80SellThru { get; set; }
    }
}
