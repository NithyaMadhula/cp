using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Igt.InstantsShowcase.Models;
using Igt.InstantsShowcase.Models.Application;
using Igt.InstantsShowcase.Models.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Igt.InstantsShowcase.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnalyticsController : InstantsShowcaseControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="repo"></param>
        /// <param name="userManager"></param>
        public AnalyticsController(IHttpContextAccessor context, CustomerPortalRepository repo, UserManager<ApplicationUser> userManager) : base(context, repo, userManager)
        {

        }

        /// <summary>
        /// Returns a report of active sales
        /// </summary>
        /// <remarks>
        /// spGame_GetActiveSalesThru
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="customer">Request parameters</param> 
        [HttpGet]
        [Route("sales/active/{customer?}")]
        public async Task<IEnumerable<ReportActive>> PostActive(string customer)
        {            
            customer = await GetCustomerCode(customer);
            var results = await CustomerPortal.GetActiveSalesReport(customer);
            return results;
        }

        /// <summary>
        /// Returns a report of closed sales
        /// </summary>
        /// <remarks>
        /// spGame_GetCloseSalesThru
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("sales/closed")]
        public async Task<IEnumerable<ReportClosed>> PostClosed([FromBody] ReportClosedRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetClosedSalesReport(req);
            return results;
        }

        /// <summary>
        /// Returns weeks in market info for bubble chart
        /// </summary>
        /// <remarks>
        /// spWeeklySalesPenetration_GetRateOfSalesByDateAndPrice
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("weeksinmarket")]
        public async Task<IEnumerable<WeeksInMarket>> PostWeeksInMarket ([FromBody] WeeksInMarketRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetWeeksInMarket(req);
            return results;
        }

        /// <summary>
        /// Returns weekly sales penetration info for bubble chart
        /// </summary>
        /// <remarks>
        /// spWeeklySalesPenetration_Get
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>  
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("weeklysalespenetration")]
        public async Task<IEnumerable<WeeklySalesPenetration>> PostWeeklySalesPenetration([FromBody] WeeklySalesPenetrationRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetWeeklySalesPenetration(req);
            return results;
        }

        /// <summary>
        /// Returns rate of sales info for chart
        /// </summary>
        /// <remarks>
        /// spWeeklySalesPenetration_GetRateOfSalesByDate
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("rateofsales")]
        public async Task<IEnumerable<RateOfSales>> PostRateOfSales([FromBody] RateOfSalesRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetRateOfSales(req);
            return results;
        }

        /// <summary>
        /// Returns rate of sales tren info for chart
        /// </summary>
        /// <remarks>
        /// spWeeklySalesPenetration_GetRateOfSalesWithExclude
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>   
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("rateofsalestrend")]
        public async Task<IEnumerable<RateOfSalesTrend>> PostRateOfSalesTrend([FromBody] RateOfSalesTrendRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetRateOfSalesTrend(req);
            return results;
        }

        /// <summary>
        /// Returns info about Lotteries Sales
        /// </summary>
        /// <remarks>
        /// spLottery_GetSalesByYear
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("nalolotterysales")]
        public async Task<IEnumerable<NaloLotterySales>> PostNaloLotterySales([FromBody] NaloLotterySalesRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetNaloLotterySales(req);
            return results;
        }

        /// <summary>
        /// Returns info about Lottery YTD Sales
        /// </summary>
        /// <remarks>
        /// spLottery_GetTotalYTDSales
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("naloytdsales")]
        public async Task<IEnumerable<NaloYtdSales>> PostNaloYtdSales([FromBody] NaloYtdSalesRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetNaloYtdSales(req);            
            return results;
        }

        /// <summary>
        /// Returns a list of lotteries
        /// </summary>
        /// <remarks>
        /// spWeeklySalesPenetration_GetWeekEnding
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="customer">Customer code</param>        
        [HttpGet]
        [Route("salesweekendings/{customer}")]
        public async Task<IEnumerable<SalesWeekEndings>> GetSalesWeekEndings(string customer)
        {
            customer = await GetCustomerCode(customer);
            var list = await CustomerPortal.GetSalesWeekEndings(customer);
            return (list == null || !list.Any()) ? null : list;
        }

        /// <summary>
        /// Returns a list of tickets 
        /// </summary>
        /// <remarks>
        /// spLottery_GetTicketSales
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param>   
        [HttpPost]
        [Route("ticketbreakdown")]
        public async Task<IEnumerable<TicketBreakdown>> PostTicketBreakdown([FromBody] DashboardCurrentRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            return await CustomerPortal.GetTicketBreakdown(req);
        }

        /// <summary>
        /// Returns a list of snapshot weekly sales FYTD 
        /// </summary>
        /// <remarks>
        /// spLottery_GetSalesAverageByTicketPrice
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param>
        [HttpPost]
        [Route("fytdweeklysalessnapshot")]
        public async Task<IEnumerable<FytdWeeklySalesSnapshot>> PostFytdWeeklySalesSnapshot([FromBody] DashboardCurrentRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            return await CustomerPortal.GetFytdWeeklySalesSnapshot(req);
        }

        /// <summary>
        /// Returns the games sales info for a game
        /// </summary>
        /// <remarks>
        /// spGame_GetEWRByGameID
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        ///         
        [HttpGet]
        [Route("gamesales/{gameId}")]
        public async Task<IEnumerable<GameSales>> GetGameSales(int gameId)
        {
            var list = await CustomerPortal.GetGameSales(gameId);
            if (list == null || !list.Any()) return null;
            return list;
        }

        /// <summary>
        /// Returns basic index info based on search criteria
        /// </summary>
        /// <remarks>
        /// spLottery_GetIndexBasicSearch
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("customindex/basic")]
        public async Task<IEnumerable<CustomIndexBasic>> PostBasicIndex([FromBody] CustomIndexBasicRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetBasicIndex(req);
            return results;
        }

        /// <summary>
        /// Returns detailed info about a game
        /// </summary>
        /// <remarks>
        /// spGame_GetDetailsByGameID
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>        
        [HttpGet]
        [Route("gamedetails/{gameId}")]
        public async Task<GameDetails> GetGameDetails(int gameId)
        {
            var customer = await GetCustomerCode();
            var results = await CustomerPortal.GetGameDetails(customer, gameId);            
            return results;
        }

        /// <summary>
        /// Returns the prize structure for a game
        /// </summary>
        /// <remarks>
        /// spGame_GetPrizeStructure
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>        
        [HttpGet]
        [Route("gameprizestructure/{gameId}")]
        public async Task<IEnumerable<GamePrizeStructure>> GetGamePrizeStructure(int gameId)
        {
            var customer = await GetCustomerCode();
            var results = await CustomerPortal.GetGamePrizeStructure(customer, gameId);
            return results;
        }

        /// <summary>
        /// Returns info about weekly sales
        /// </summary>
        /// <remarks>
        /// spLottery_GetTotalYTDSales
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param> 
        [HttpPost]
        [Route("instantweeklysales")]
        public async Task<WeeklySales> PostInstantWeeklySales([FromBody] DashboardCurrentRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetInstantWeeklySales(req);
            return results;
        }

        /// <summary>
        /// Returns a list weekly sales by year
        /// </summary>
        /// <remarks>
        /// 
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param>
        [HttpPost]
        [Route("weeklysalesyear")]
        public async Task<IEnumerable<LotteryFytdWeeklySalesAndPriorYears>> PostLotteryFytdWeeklySalesAndPriorYears([FromBody] DashboardCurrentRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetLotteryFytdWeeklySalesAndPriorYears(req);
            return results;
        }

        /// <summary>
        /// Returns a list weekly sales by year / ticket price
        /// </summary>
        /// <remarks>
        /// spLottery_GetTotalSalesByWeekAndTicketPrice
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="req">Request parameters</param>
        [HttpPost]
        [Route("weeklysalesyearticketprice")]
        public async Task<IEnumerable<WeeklySalesYearTicketPrice>> PostWeeklySalesYearTicketPrice([FromBody] DashboardCurrentRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetWeeklySalesYearTicketPrice(req);
            return results;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [Route("prize-structure-profile")]
        [HttpPost]
        public async Task<IActionResult> GenerateProfile([FromBody] PrizeStructureProfileRequest req)
        {
            req.CustomerCode = await GetCustomerCode(req.CustomerCode);
            return Ok(await CustomerPortal.GetPrizeStructureProfile(req));
        }
    }
}
