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
    public class LotteryLogoController : InstantsShowcaseControllerBase
    {
        public LotteryLogoController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns logo info for external users
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <response code="204">No Content</response>  
        /// 
        [HttpGet]
        public async Task<CustomerLogo> Get()
        {
            string customer = null;
            this.GetCustomer(out customer);

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await Process(customer);
        }

        /// <summary>
        /// Returns logo info for internal users
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="customerCode">Customer code</param>
        [Route("{customerCode}")]
        [HttpGet]
        public async Task<CustomerLogo> Get(string customerCode)
        {
            return await Process(customerCode);
        }

        private async Task<CustomerLogo> Process(string code)
        {
            return await new CustomerRepository(ConnectionFactory).GetLogo(code);
        }

    }
}
