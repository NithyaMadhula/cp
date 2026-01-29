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
    public class NaloAverageSalesController : InstantsShowcaseControllerBase
    {
        public NaloAverageSalesController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns info about Lotteries Average Sales
        /// </summary>
        /// <remarks>
        /// Used in NALO
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]NaloAverageSalesRequest request)
        {
            string customer = null;           

            if (!request?.Customers?.Any() ?? true)
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new NaloAverageSalesRepository(ConnectionFactory).List(request.Customers,
                request.StartDate,
                request.EndDate,
                request.PriorStartDate
                );

            if (list?.Any() ?? false)
            {
                return Ok(list);
            }
            
            return NoContent();
        }
    }
}
