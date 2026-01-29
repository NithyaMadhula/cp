using Igt.InstantsShowcase.Models;
using IGT.CustomerPortal.API.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BingoCrosswordController : InstantsShowcaseControllerBase
    {
        public BingoCrosswordController (IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager): base(context, customerPortal, userManager) {}

        /// <summary>
        /// Returns a list of bingo\crossword info
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="request">Request parameters</param>
        /// 
        [HttpPost]
        public async Task<IEnumerable<LotteryBingoCrossword>> Post([FromBody]DashboardCurrentRequest request)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = request.Customer;
            }

            if (string.IsNullOrEmpty(customer) || !request.YearType.HasValue)
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await new BingoCrosswordRepository(ConnectionFactory).List(customer, yearType);
        }
    }
}
