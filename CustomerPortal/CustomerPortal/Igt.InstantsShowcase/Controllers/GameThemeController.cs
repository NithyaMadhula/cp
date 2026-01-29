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
    public class GameThemeController : InstantsShowcaseControllerBase
    {
        public GameThemeController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of game themes
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpGet]
        public async Task<IEnumerable<Theme>> Get()
        {
            var temp = await new ThemeRepository(ConnectionFactory).ListForGameSeach();
            if (temp == null) return null;
            return (temp.Any()) ? temp : null;
        }
    }
}
