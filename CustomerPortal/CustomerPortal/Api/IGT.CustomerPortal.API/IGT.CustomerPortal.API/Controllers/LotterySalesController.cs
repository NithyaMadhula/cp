using IGT.CustomerPortal.API.DTO.Request;
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
    public class LotterySalesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns NALO info
        /// </summary>
        /// <remarks>
        /// Used in Nalo
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        private async Task<IEnumerable<GameLaunch>> Post([FromBody]GameLaunchesRequest req)
        {
            //string customer = null;
            //if (!this.IsIGT())
            //{
            //    this.GetCustomer(out customer);
            //}
            //else
            //{
            //    customer = req.Customer;
            //}

            //if (string.IsNullOrEmpty(customer) || !req.Year.HasValue)
            //{
            //    ApiWorkflowHelper.AbortBadRequest();
            //}

            //var list = await Process(req.Year.Value, customer,
            //    req.TicketPrice ?? -1,
            //    req.IncludePriorYear ?? 0,
            //    req.ShowIndex ?? 1,
            //    req.FiscalYear ?? 0
            //    );
            //if (list == null || !list.Any()) return null;

            //foreach (var item in list)
            //{
            //    item.ImgPath = this.GetFullConceptsUri(item.ImgPath);
            //}
            //return list;
            return null;
        }
    }
}
