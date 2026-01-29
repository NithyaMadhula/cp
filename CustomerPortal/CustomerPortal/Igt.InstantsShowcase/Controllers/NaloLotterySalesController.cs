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
    public class NaloLotterySalesController : InstantsShowcaseControllerBase
    {
        public NaloLotterySalesController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns info about Lotteries Sales
        /// </summary>
        /// <remarks>
        /// Used in NALO
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]NaloLotterySalesRequest request)
        {
            //string customer = null;
            //if (!this.IsIGT())
            //{
            //    this.GetCustomer(out customer);
            //}
            //else
            //{
            //    customer = request.Customer;
            //}

            //if (string.IsNullOrEmpty(customer))
            //{
            //    ApiWorkflowHelper.AbortBadRequest();
            //}            

            if (String.IsNullOrWhiteSpace(request.Customer)) request.Customer = "IGT";
            var list = await new NaloLotterySalesRepository(ConnectionFactory).List(request.Customer, request.Startdate);

            if (list?.Any() ?? false)
            {
                return Ok(list);
            }

            return NoContent();
        }
    }
}
