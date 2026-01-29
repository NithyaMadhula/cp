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
    public class WeeklySalesPenetrationController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns weekly sales penetration info for bubble chart
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [Route("api/weeklysalespenetration")]
        public async Task<IEnumerable<WeeklySalesPenetration>> Post([FromBody]WeeklySalesPenetrationRequest request)
        {
            string customer = "";
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

            var list = await new WeeklySalesPenetrationRepository(ConnectionFactory).List(customer, request.EndOfWeek, request.TicketPrice);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
