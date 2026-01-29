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
    [Route("api/prize-structure-profile")]
    [ApiController]
    [Authorize]
    public class PrizeStructureProfileController : InstantsShowcaseControllerBase
    {
        public PrizeStructureProfileController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        [HttpPost]
        public async Task<IHttpActionResult> GenerateProfile([FromBody]PrizeStructureProfileRequest request)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
                request.CustomerCode = customer;
            }

            return Ok(await new PrizeStructureProfileRepository(ConnectionFactory).Get(request));
        }        
    }
}
