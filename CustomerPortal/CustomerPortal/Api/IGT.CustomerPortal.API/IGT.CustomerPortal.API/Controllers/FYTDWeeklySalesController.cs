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
    [DefaultIgtAuthorizeAllButClients]
    public class FYTDWeeklySalesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a list of weekly sales FYTD 
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="request">Request parameters</param>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<FYTDWeeklySales>> Post([FromBody]DashboardCurrentRequest request)
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

        private async Task<IEnumerable<FYTDWeeklySales>> Process(int yearType, string customer)
        {
            return await new FYTDWeeklySalesRepository(ConnectionFactory).List(customer, yearType);
        }

    }
}
