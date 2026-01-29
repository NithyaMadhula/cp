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
    public class ThemeIndexedController : InstantsShowcaseControllerBase
    {
        public ThemeIndexedController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of indexes by theme
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
        public async Task<IEnumerable<ChartIndexed>> Post([FromBody]DashboardCurrentRequest request)
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

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await Process(customer);
        }

        private async Task<IEnumerable<ChartIndexed>> Process(string customer)
        {
            return await new ThemeIndexedRepository(ConnectionFactory).List(customer);
        }
    }
}
