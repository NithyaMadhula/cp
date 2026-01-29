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
    public class ConceptController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a list of concept games based on a search criteria
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [HttpPost]
        [Route("api/concept/detailedgamesearch")]
        public async Task<IEnumerable<ConceptDetailedGameSearch>> SearchConcept([FromBody]ConceptDetailedGameSearchRequest req)
        {
            string customer = null;
            //if (!this.IsIGT())
            //{
            this.GetCustomer(out customer);
            //}
            //else
            //{
            //    customer = req.Customer;
            //}

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new DetailedGameSearchRepository(ConnectionFactory).ListConcept(customer, req.GameName ?? "",
                req.TicketPrice ?? -1,
                req.Theme ?? -1,
                req.Color ?? -1,
                req.PlayStyle ?? -1,
                req.Feature ?? -1,
                req.PageSize ?? -1,
                req.PageIndex ?? -1,
                req.CurrencyCode ?? null);

            if (list == null || !list.Any()) return null;
            //DetailedGameSearch.ConceptsUrl = this.GetFullConceptsUri();
            return list;
        }

        /// <summary>
        /// Returns detailed info about a concept game
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
        [Route("api/concept/gamedetails/{gameId}")]
        public async Task<ConceptGameDetail> Get(int gameId)
        {
            string customer = null;
            this.GetCustomer(out customer);

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var model = await new GameDetailsRepository(ConnectionFactory).GetConcept(gameId);
            if (model == null) return null;
            //GameDetails.ConceptsUrl = this.GetFullConceptsUri();
            return model;
        }

        /// <summary>
        /// Returns a list of random featured concept games
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
        [Route("api/concept/gamefeatured")]
        public async Task<IEnumerable<ConceptFeatured>> Featured([FromBody]GameFeaturedRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }

            var list = await new GameRepository(ConnectionFactory).ListConceptFeatured(
                req.PageSize ?? -1,
                req.PageIndex ?? -1
                );
            if (list == null || !list.Any()) { return null; }

            return list;
        }
    }
}
