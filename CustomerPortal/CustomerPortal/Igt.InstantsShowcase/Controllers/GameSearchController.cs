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
    public class GameSearchController : InstantsShowcaseControllerBase
    {
        public GameSearchController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of games based on a search criteria
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpPost]
        public async Task<IEnumerable<GameSearch>> Post([FromBody]GameSearchRequest req)
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

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new GameSearchRepository(ConnectionFactory).List(customer,
                req.GameName ?? "",
                req.TicketPrice ?? -1,
                req.Year ?? -1, 
                req.Theme ?? "",
                req.PageSize ?? -1,
                req.PageIndex ?? -1);
            if (list == null || !list.Any()) return null;
            //GameSearch.ConceptsUrl = this.GetFullConceptsUri();
            return list;
        }
    }
}
