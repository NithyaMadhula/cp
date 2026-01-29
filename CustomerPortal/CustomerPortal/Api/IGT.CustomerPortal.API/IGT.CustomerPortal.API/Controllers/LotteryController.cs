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
    public class LotteryController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a list of lotteries
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="customerType">Customer type id</param>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [HttpGet]
        [Route("api/lottery/{customerType}")]
        public async Task<IEnumerable<Customer>> Get(int customerType)
        {
            IEnumerable<Customer> lotteries = await new LotteryRepository(ConnectionFactory).List(customerType);
            return (lotteries == null || !lotteries.Any()) ? null : lotteries;
        }

        /// <summary>
        /// Returns a list of lotteries
        /// </summary>
        /// <remarks>
        /// Used in Penetration Charts
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// <param name="customerType">Customer type id</param>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [HttpGet]
        [Route("api/lotterypenetration/{customerType}")]
        public async Task<IEnumerable<Customer>> GetWithPenetration(int customerType)
        {
            IEnumerable<Customer> lotteries = await new LotteryRepository(ConnectionFactory).ListWithPenetation(customerType);
            return (lotteries == null || !lotteries.Any()) ? null : lotteries;
        }
    }
}
