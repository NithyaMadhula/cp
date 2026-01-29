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
    public class RateOfSalesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns rate of sales info for chart
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<RateOfSales>> Post([FromBody]RateOfSalesRequest request)
        {
            if (string.IsNullOrEmpty(request.Customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new RateOfSalesRepository(ConnectionFactory).List(request.Customer, request.EndOfWeek);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
