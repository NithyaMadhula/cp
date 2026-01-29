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
    public class TicketPriceController : InstantsShowcaseControllerBase
    {
        public TicketPriceController (IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager): base(context, customerPortal, userManager) {}

        [HttpGet]
        [Route("{customerCode}")]
        public async Task<IEnumerable<TicketPrice>> Get(string customerCode)
        {
            var list = await new TicketPriceRepository(ConnectionFactory).List(customerCode);
            return (list == null || !list.Any()) ? null : list;
        }

    }
}
