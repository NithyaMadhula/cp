using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class SalesWeekendingsController : ApiController
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
        /// <param name="customer">Customer code</param>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        [HttpGet]
        [Route("api/salesweekendings/{customer}")]
        public async Task<IEnumerable<SalesWeekendings>> Get(string customer)
        {
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

            IEnumerable<SalesWeekendings> list = await new SalesWeekendingsRepository(ConnectionFactory).List(customer);
            return (list == null || !list.Any()) ? null : list;
        }
    }
}
