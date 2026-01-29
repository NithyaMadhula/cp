using IGT.CustomerPortal.API.DTO.Response;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    public class VendorTypeController : ApiController
    {
        /// <summary>
        /// Returns a list of vendor types 
        /// </summary>
        /// <remarks>
        /// Used in Reports
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
                        new ApiSelectOption( "0", "IGT", true ),
                        new ApiSelectOption( "1", "Non-IGT", false ),
                        new ApiSelectOption( "2", "All", false )
                };
        }
    }
}
