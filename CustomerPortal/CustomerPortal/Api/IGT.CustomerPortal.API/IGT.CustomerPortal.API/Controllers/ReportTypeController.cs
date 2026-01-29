using IGT.CustomerPortal.API.Model;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorizeAllButClients]
    public class ReportTypeController : ApiController
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
        public IEnumerable<ReportType> Get()
        {
            return new List<ReportType>
                {
                        new ReportType
                        {
                            Id = 1,
                            Name = "Current Active Game Sales and Sell-Th-ru",
                            ApiPath = "/report/activesales"
                        },
                        new ReportType
                        {
                            Id = 2,
                            Name = "Closed Games Sales & Sell-Thru",
                            ApiPath = "/report/closedsales"
                        },
                        new ReportType
                        {
                            Id = 3,
                            Name = "Sales & Sell-Thru By Selected Price Point",
                            ApiPath = "/report/pricepointdynamic"
                        },
                        new ReportType
                        {
                            Id = 4,
                            Name = "Top 40 Sales",
                            ApiPath = "/report/top"
                        },
                };
        }
    }
}
