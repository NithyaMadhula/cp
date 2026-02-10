using System.Threading.Tasks;
using Igt.InstantsShowcase.Models.Application;
using Igt.InstantsShowcase.Models.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Igt.InstantsShowcase.Controllers
{
    /// <summary>
    /// Provides application or session specific metadata
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MetadataController : InstantsShowcaseControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="repo"></param>
        /// <param name="userManager"></param>
        public MetadataController(IHttpContextAccessor context, CustomerPortalRepository repo, UserManager<ApplicationUser> userManager) : base(context, repo, userManager)
        {

        }

        /// <summary>
        /// Returns information pertaining to the current logged in user.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("user")]
        public async Task<dynamic> GetCurrentUserMetadata()
        {
            var user = await GetCurrentUser();
            if (user == null)
            {
                return Unauthorized();
            }

            return new { user.OrganizationCode, user.UserName };
        }
    }
}
