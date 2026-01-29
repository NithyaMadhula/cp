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
    public class NaloYTDSalesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns info about Lottery YTD Sales
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
        public async Task<IEnumerable<NaloYTDSales>> Post([FromBody]NaloYTDSalesRequest request)
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

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new NaloYTDSalesRepository(ConnectionFactory).List(customer);
            if (list == null || !list.Any()) return null;
            return list;
        }
    }
}
