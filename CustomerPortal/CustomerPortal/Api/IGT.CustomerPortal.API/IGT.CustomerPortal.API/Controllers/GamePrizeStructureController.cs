using IGT.CustomerPortal.API.DAL;
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
    public class GamePrizeStructureController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns the prize structure for a game
        /// </summary>
        /// <remarks>
        /// Used in Game Search, Indexing
        /// 
        /// Details
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [HttpGet]
        [Route("api/gameprizestructure/{gameId}")]
        public async Task<IEnumerable<GamePrizeStructure>> Get(int gameId)
        {
            string customer = null;
            this.GetCustomer(out customer);

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await Process(customer, gameId);
            if (list == null || !list.Any()) return null;
            return list;
        }

        private async Task<IEnumerable<GamePrizeStructure>> Process(string customer, int gameId)
        {
            return await new GamePrizeStructureRepository(ConnectionFactory).List(customer, gameId);
        }
    }
}
