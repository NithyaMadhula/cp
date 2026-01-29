using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using Swashbuckle.Swagger.Annotations;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class GameDetailsController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns detailed info about a game
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
        [Route("api/gamedetails/{gameId}")]
        public async Task<GameDetails> Get(int gameId)
        {
            string customer = null;
            this.GetCustomer(out customer);

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var model = await Process(customer, gameId);
            if (model == null) return null;
            //GameDetails.ConceptsUrl = this.GetFullConceptsUri();
            return model;
        }

        private async Task<GameDetails> Process(string customer, int gameId)
        {
            return await new GameDetailsRepository(ConnectionFactory).Get(customer, gameId);
        }
    }
}
