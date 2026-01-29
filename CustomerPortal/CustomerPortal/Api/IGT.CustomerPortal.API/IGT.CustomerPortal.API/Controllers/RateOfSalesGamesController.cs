using IGT.CustomerPortal.API.DTO.Response;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorizeAllButClients]
    public class RateOfSalesGamesController : ApiController
    {
        /// <summary>
        /// Returns a list of game types 
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public IEnumerable<ApiSelectOption> Get()
        {
            return new List<ApiSelectOption>
                {
                        new ApiSelectOption( "0", "All Games", true ),
                        new ApiSelectOption( "1", "Extended Play", false ),
                        new ApiSelectOption( "2", "Non Extended Play", false )
                };
        }
    }
}
