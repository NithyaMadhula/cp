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
    public class RateOfSalesController : InstantsShowcaseControllerBase
    {
        public RateOfSalesController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns rate of sales info for chart
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpPost]
        public async Task<IEnumerable<RateOfSales>> Post([FromBody]RateOfSalesRequest request)
        {
            if (string.IsNullOrEmpty(request.Customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new RateOfSalesRepository(ConnectionFactory).List(request.Customer, request.EndOfWeek);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
