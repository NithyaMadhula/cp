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
    public class WeeklySalesYearTicketPriceController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a list weekly sales by year / ticket price
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="request">Request parameters</param>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<WeeklySalesYearTicketPrice>> Post([FromBody]DashboardCurrentRequest request)
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

            if (string.IsNullOrEmpty(customer) || !request.YearType.HasValue || !request.TicketPrice.HasValue)
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await Process(customer, request.YearType.Value, request.TicketPrice.Value);
        }

        private async Task<IEnumerable<WeeklySalesYearTicketPrice>> Process(string customer, int yearType, decimal ticketPrice)
        {
            return await new WeeklySalesYearTicketPriceRepository(ConnectionFactory).List(customer, yearType, ticketPrice);
        }
    }
}
