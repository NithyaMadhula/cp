using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.DTO.Response;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class FavoriteController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

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
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
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
        [Route("api/favorite/{gameid}")]
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
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
        [Route("api/favorite/{favoriteid}")]
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
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
