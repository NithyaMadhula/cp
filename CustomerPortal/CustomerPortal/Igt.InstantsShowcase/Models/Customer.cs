namespace Igt.InstantsShowcase.Models
{
    /// <summary>
    /// DTO representation of a customer lottery.
    /// </summary>
    public class Customer
    {
        /// <summary>
        /// Code for a given customer
        /// </summary>
        /// <example>"VA" for Virginia Lottery</example>        
        public string CustomerCode { get; set; }
        /// <summary>
        /// Name of customer lottery
        /// </summary>
        /// <example>Virginia Lottery</example>
        public string BusinessName { get; set; }
        /// <summary>
        /// Full path to customer brand image file name
        /// </summary>
        /// <example>WARN: [spLottery_GetCustomerList] uses \\usflfpevadmin04\Business Intelligence\Graphics\Lottery Logos\Arizona_20151124.jpg</example>
        /// TODO: use logoname instead
        public string LogoPath { get; set; }
        /// <summary>
        /// Customer brand image file name 
        /// </summary>
        /// <example>Arizona_20151124.jpg</example>
        public string LogoName { get; set; }
        /// <summary>
        /// Code for a given customer
        /// </summary>
        public string SubdivisionCode { get; set; }
    }
}
