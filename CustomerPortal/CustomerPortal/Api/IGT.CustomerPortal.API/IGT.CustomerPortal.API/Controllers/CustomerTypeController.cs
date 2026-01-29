using IGT.CustomerPortal.API.DTO.Response;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorizeAllButClients]
    public class CustomerTypeController : ApiController
    {
        /// <summary>
        /// Returns a list of customer types (domestic or international) 
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current, Game Search, Penetration Charts
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
                        new ApiSelectOption( "0", "Domestic", true ),
                        new ApiSelectOption( "1", "International", false )
                };
        }
    }
}
