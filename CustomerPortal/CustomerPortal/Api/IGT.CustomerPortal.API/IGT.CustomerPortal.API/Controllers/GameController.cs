using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class GameController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a list of featured games
        /// </summary>
        /// <remarks>
        /// Used in Games
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [HttpPost]
        [Route("api/gamefeatured/")]
        public async Task<IEnumerable<GameFeatured>> Featured([FromBody]GameFeaturedRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }

            // TODO: Forced Texas for first demo
            customer = "TX";
            var list = await new GameRepository(ConnectionFactory).ListFeatured(customer,
                req.PageSize ?? -1,
                req.PageIndex ?? -1);
            if (list == null || !list.Any()) { return null;  }

            return list;
        }
    }
}
