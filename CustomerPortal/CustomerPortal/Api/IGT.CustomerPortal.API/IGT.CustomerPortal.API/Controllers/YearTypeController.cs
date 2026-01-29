using IGT.CustomerPortal.API.DTO.Response;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class YearTypeController : ApiController
    {
        /// <summary>
        /// Returns a list of year types 
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
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
                    new ApiSelectOption("0", "Calendar Year", true),
                    new ApiSelectOption("1", "Fiscal Year", false)
                };
        }
    }
}
