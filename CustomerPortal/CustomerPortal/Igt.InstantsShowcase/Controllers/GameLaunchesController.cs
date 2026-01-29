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
    public class GameLaunchesController : InstantsShowcaseControllerBase
    {
        public GameLaunchesController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns game launches info based on search criteria
        /// </summary>
        /// <remarks>
        /// Used in Game Launch
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpPost]
        public async Task<IEnumerable<GameLaunch>> Post([FromBody]GameLaunchesRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = req.Customer;
            }

            if (string.IsNullOrEmpty(customer) || !req.Year.HasValue)
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new GameLaunchRepository(ConnectionFactory).List(year, code, ticketPrice, includePriorYear, showIndex, fiscalYear);
            if (list == null || !list.Any()) return null;
            //GameLaunch.ConceptsUrl = this.GetFullConceptsUri();

            return list;
        }
    }
}
