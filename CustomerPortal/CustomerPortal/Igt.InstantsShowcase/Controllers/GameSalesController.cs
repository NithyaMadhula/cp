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
    public class GameSalesController : InstantsShowcaseControllerBase
    {
        public GameSalesController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns the games sales info for a game
        /// </summary>
        /// <remarks>
        /// Used in Game Search, Indexing
        /// 
        /// Details
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpGet]
        [Route("{gameId}")]
        public async Task<IEnumerable<GameSales>> Get(int gameId)
        {
            string customer = null;
            this.GetCustomer(out customer);

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new GameSalesRepository(ConnectionFactory).List(gameId);
            if (list == null || !list.Any()) return null;

            //var uri = ConfigurationManager.AppSettings["ConceptsBaseUri"];
            //foreach (var item in list)
            //{
            //    item.ImagePath = Path.Combine(uri, item.ImagePath);
            //}
            return list;
        }
    }
}
