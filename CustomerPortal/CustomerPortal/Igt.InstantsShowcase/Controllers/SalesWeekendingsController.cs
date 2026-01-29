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
    public class SalesWeekendingsController : InstantsShowcaseControllerBase
    {
        public SalesWeekendingsController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of lotteries
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="customer">Customer code</param>
        [HttpGet]
        [Route("{customer}")]
        public async Task<IEnumerable<SalesWeekendings>> Get(string customer)
        {
            this.GetCustomer(out customer);
            //}
            //else
            //{
            //    customer = req.Customer;
            //}

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            IEnumerable<SalesWeekendings> list = await new SalesWeekendingsRepository(ConnectionFactory).List(customer);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
