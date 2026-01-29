using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class NaloLotterySalesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns info about Lotteries Sales
        /// </summary>
        /// <remarks>
        /// Used in NALO
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]NaloLotterySalesRequest request)
        {
            //string customer = null;
            //if (!this.IsIGT())
            //{
            //    this.GetCustomer(out customer);
            //}
            //else
            //{
            //    customer = request.Customer;
            //}

            //if (string.IsNullOrEmpty(customer))
            //{
            //    ApiWorkflowHelper.AbortBadRequest();
            //}            

            if (String.IsNullOrWhiteSpace(request.Customer)) request.Customer = "IGT";
            var list = await new NaloLotterySalesRepository(ConnectionFactory).List(request.Customer, request.Startdate);

            if (list?.Any() ?? false)
            {
                return Ok(list);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
