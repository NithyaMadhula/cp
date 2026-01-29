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
    public class NaloAverageSalesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns info about Lotteries Average Sales
        /// </summary>
        /// <remarks>
        /// Used in NALO
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IHttpActionResult> Post([FromBody]NaloAverageSalesRequest request)
        {
            string customer = null;           

            if (!request?.Customers?.Any() ?? true)
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new NaloAverageSalesRepository(ConnectionFactory).List(request.Customers,
                request.StartDate,
                request.EndDate,
                request.PriorStartDate
                );

            if (list?.Any() ?? false)
            {
                return Ok(list);
            }
            
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
