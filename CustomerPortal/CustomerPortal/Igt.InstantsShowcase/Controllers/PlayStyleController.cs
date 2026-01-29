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
    public class PlayStyleController : InstantsShowcaseControllerBase
    {
        public PlayStyleController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        [HttpGet]
        public async Task<IEnumerable<PlayStyle>> Get()
        {
            var temp = await new PlayStyleRepository(ConnectionFactory).List();
            if (temp == null) return null;
            return (temp.Any()) ? temp : null;
        }
    }
}
