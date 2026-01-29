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
    public class LotterySalesController : InstantsShowcaseControllerBase
    {
        public LotterySalesController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns NALO info
        /// </summary>
        /// <remarks>
        /// Used in Nalo
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        private async Task<IEnumerable<GameLaunch>> Post([FromBody]GameLaunchesRequest req)
        {
            //string customer = null;
            //if (!this.IsIGT())
            //{
            //    this.GetCustomer(out customer);
            //}
            //else
            //{
            //    customer = req.Customer;
            //}

            //if (string.IsNullOrEmpty(customer) || !req.Year.HasValue)
            //{
            //    ApiWorkflowHelper.AbortBadRequest();
            //}

            //var list = await Process(req.Year.Value, customer,
            //    req.TicketPrice ?? -1,
            //    req.IncludePriorYear ?? 0,
            //    req.ShowIndex ?? 1,
            //    req.FiscalYear ?? 0
            //    );
            //if (list == null || !list.Any()) return null;

            //foreach (var item in list)
            //{
            //    item.ImgPath = this.GetFullConceptsUri(item.ImgPath);
            //}
            //return list;
            return null;
        }
    }
}
