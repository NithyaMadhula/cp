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
    public class WeeklySalesYearController : InstantsShowcaseControllerBase
    {
        public WeeklySalesYearController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list weekly sales by year
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="request">Request parameters</param>        
        [HttpPost]
        public async Task<IEnumerable<LotteryFYTDWeeklySalesAndPriorYears>> Post([FromBody]DashboardCurrentRequest request)
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

            return await Process(customer, request.YearType.Value);
        }

        private async Task<IEnumerable<LotteryFYTDWeeklySalesAndPriorYears>> Process(string customer, int yearType)
        {
            return await new WeeklySalesYearRepository(ConnectionFactory).List(customer, yearType);
        }
    }
}
