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
    public class FeatureController : InstantsShowcaseControllerBase
    {
        public FeatureController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of features 
        /// </summary>
        /// <remarks>
        /// Used in Indexing - Custom Index
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpGet]
        public async Task<IEnumerable<Feature>> Get()
        {
            var features = await new FeatureRepository(ConnectionFactory).List();
            return (features == null || !features.Any()) ? null : features;
        }

    }
}
