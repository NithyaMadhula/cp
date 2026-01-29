using IGT.CustomerPortal.API.DAL;
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
    public class TicketPricePenetrationController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a list of ticket price for Penetration Charts
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="customerCode">Customer code</param>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [HttpGet]
        [Route("api/ticketpricepenetration/{customerCode}")]
        public async Task<IEnumerable<TicketPrice>> Get(string customerCode)
        {
            if (!this.IsIGT())
            {
                this.GetCustomer(out customerCode);
            }

            var list = await new TicketPriceRepository(ConnectionFactory).ListPenetration(customerCode);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
