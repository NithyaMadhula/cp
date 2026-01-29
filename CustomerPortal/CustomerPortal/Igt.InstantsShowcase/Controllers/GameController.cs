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
    public class GameController : InstantsShowcaseControllerBase
    {
        public GameController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of featured games
        /// </summary>
        /// <remarks>
        /// Used in Games
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("featured")]
        public async Task<IEnumerable<GameFeatured>> Featured([FromBody]GameFeaturedRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }

            // TODO: Forced Texas for first demo
            customer = "TX";
            var list = await new GameRepository(ConnectionFactory).ListFeatured(customer,
                req.PageSize ?? -1,
                req.PageIndex ?? -1);
            if (list == null || !list.Any()) { return null;  }

            return list;
        }
    }
}
