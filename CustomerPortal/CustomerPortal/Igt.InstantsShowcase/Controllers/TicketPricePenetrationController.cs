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
    public class TicketPricePenetrationController : InstantsShowcaseControllerBase
    {
        public TicketPricePenetrationController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of ticket price for Penetration Charts
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="customerCode">Customer code</param>
        [HttpGet]
        [Route("{customerCode}")]
        public async Task<IEnumerable<TicketPrice>> Get(string customerCode)
        {
            if (!this.IsIGT())
            {
                this.GetCustomer(out customerCode);
            }

            var list = await new TicketPriceRepository(ConnectionFactory).ListPenetration(customerCode);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
