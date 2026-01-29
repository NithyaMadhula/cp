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
    public class GameSalesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns the games sales info for a game
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
        [Route("api/gamesales/{gameId}")]
        public async Task<IEnumerable<GameSales>> Get(int gameId)
        {
            string customer = null;
            this.GetCustomer(out customer);

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await Process(customer, gameId);
            if (list == null || !list.Any()) return null;

            //var uri = ConfigurationManager.AppSettings["ConceptsBaseUri"];
            //foreach (var item in list)
            //{
            //    item.ImagePath = Path.Combine(uri, item.ImagePath);
            //}
            return list;
        }

        private async Task<IEnumerable<GameSales>> Process(string customer, int gameId)
        {
            return await new GameSalesRepository(ConnectionFactory).List(gameId);
        }
    }
}
