using Igt.InstantsShowcase.Models;
using Igt.InstantsShowcase.Models.Application;
using Igt.InstantsShowcase.Models.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LotteryController : InstantsShowcaseControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="repo"></param>
        /// <param name="userManager"></param>
        public LotteryController(IHttpContextAccessor context, CustomerPortalRepository repo, UserManager<ApplicationUser> userManager) : base(context, repo, userManager)
        {
            
        }

        /// <summary>
        /// Returns a list of all lotteries
        /// </summary>
        /// <remarks>
        /// spLottery_GetCustomerList
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{isInternational}")]
        public async Task<IEnumerable<Customer>> GetList(int isInternational)
        {
            var result = await CustomerPortal.Lotteries(isInternational);
            return result;
        }

        /// <summary>
        /// Returns a list of lotteries with game penetration data
        /// </summary>
        /// <remarks>
        /// spLottery_GetCustomerWithPenetration
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="isInternational">0 for domestic, and 1 for international</param>
        [HttpGet]
        [Route("{isInternational}/sales")]
        public async Task<IEnumerable<Customer>> GetWithSales(int isInternational)
        {
            var result = await CustomerPortal.LotteriesWithSales(isInternational);
            return result;
        }

        /// <summary>
        /// Returns a list of lotteries with game penetration data
        /// </summary>
        /// <remarks>
        /// spLottery_GetCustomerWithPenetration
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="isInternational">0 for domestic, and 1 for international</param>
        [HttpGet]
        [Route("{isInternational}/penetration")]
        public async Task<IEnumerable<Customer>> GetWithPenetration(int isInternational)
        {
            var result = await CustomerPortal.LotteriesWithPenetration(isInternational);
            return result;
        }

        /// <summary>
        /// Returns a list of ticket prices for customer 
        /// </summary>
        /// <remarks>spLottery_GetTicketPrice</remarks>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("ticket-price")]
        public async Task<IEnumerable<TicketPrice>> GetLotteryTicketPrices()
        {
            var customerCode = await GetCustomerCode();
            var results = await CustomerPortal.GetTicketPrices(customerCode);
            return results;
        }
    }
}