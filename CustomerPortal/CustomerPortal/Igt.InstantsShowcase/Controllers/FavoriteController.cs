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
    public class FavoriteController : InstantsShowcaseControllerBase
    {
        public FavoriteController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of favorite games for the current user
        /// </summary>
        /// <remarks>
        /// Used in Favorites
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpGet]
        public async Task<IEnumerable<DetailedFavorite>> Get()
        {
            string username;
            this.GetUsername(out username);

            if (string.IsNullOrEmpty(username))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new FavoriteRepository(ConnectionFactory).List(username);
            if (list == null || !list.Any()) return null;
            return list;
        }

        /// <summary>
        /// Saves a new favorite game for the current user
        /// </summary>
        /// <remarks>
        /// Used in Favorites
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("{gameid}")]
        public async Task<GenericResponse> Post([FromUri]int gameid)
        {
            string username;
            this.GetUsername(out username);

            if (string.IsNullOrEmpty(username))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            bool result = await new FavoriteRepository(ConnectionFactory).Insert(username, gameid);
            return new GenericResponse
            {
                Successful = result
            };
        }

        /// <summary>
        /// Deletes a favorite game for the current user
        /// </summary>
        /// <remarks>
        /// Used in Favorites
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpDelete]
        [Route("{favoriteid}")]
        public async Task<GenericResponse> Delete([FromUri]int favoriteid)
        {
            string username;
            this.GetUsername(out username);

            if (string.IsNullOrEmpty(username))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }
            bool result = await new FavoriteRepository(ConnectionFactory).Delete(favoriteid);
            return new GenericResponse
            {
                Successful = result
            };

        }

    }
}
