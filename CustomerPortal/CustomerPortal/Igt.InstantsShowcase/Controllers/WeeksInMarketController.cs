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
    public class WeeksInMarketController : InstantsShowcaseControllerBase
    {
        public WeeksInMarketController (IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager): base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns weeks in market info for bubble chart
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        public async Task<IEnumerable<WeeksInMarket>> Post([FromBody]WeeksInMarketRequest request)
        {
            if (string.IsNullOrEmpty(request.Customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new WeeksInMarketRepository(ConnectionFactory).List(request.Customer, request.EndOfWeek, request.TicketPrice);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
