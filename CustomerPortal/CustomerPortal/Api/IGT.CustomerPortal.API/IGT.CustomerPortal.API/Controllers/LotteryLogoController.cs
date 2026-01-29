using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using Swashbuckle.Swagger.Annotations;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class LotteryLogoController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns logo info for external users
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <response code="204">No Content</response>  
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<CustomerLogo> Get()
        {
            string customer = null;
            this.GetCustomer(out customer);

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            return await Process(customer);
        }

        /// <summary>
        /// Returns logo info for internal users
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Data
        /// </remarks>
        /// <response code="200">Ok</response>
        /// <param name="customerCode">Customer code</param>
        [SwaggerResponse(HttpStatusCode.NoContent,Description = "No Content", Type = typeof(string))]
        [Route("api/lotterylogo/{customerCode}")]
        [HttpGet]
        public async Task<CustomerLogo> Get(string customerCode)
        {
            return await Process(customerCode);
        }

        private async Task<CustomerLogo> Process(string code)
        {
            return await new CustomerRepository(ConnectionFactory).GetLogo(code);
        }

    }
}
