using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class FYTDWeeklySalesSnapshotController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a list of snapshot weekly sales FYTD 
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="request">Request parameters</param>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [Route("api/FYTDWeeklySalesSnapshot")]
        public async Task<IEnumerable<FYTDWeeklySalesSnapshot>> Post([FromBody]DashboardCurrentRequest request)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = request.Customer;
            }

            if (string.IsNullOrEmpty(customer) || !request.YearType.HasValue)
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await Process(request.YearType.Value, customer);
        }

        private async Task<IEnumerable<FYTDWeeklySalesSnapshot>> Process(int yearType, string customer)
        {
            return await  new FYTDWeeklySalesSnapshotRepository(ConnectionFactory).List(customer, yearType);
        }

    }
}
