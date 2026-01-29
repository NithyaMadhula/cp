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
    public class ReportController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns a report of active sales
        /// </summary>
        /// <remarks>
        /// Used in Reports
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/report/activesales")]
        public async Task<IHttpActionResult> PostActive([FromBody]ReportActiveRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = req.Customer;
            }

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new ReportRepository(ConnectionFactory).ListActive(customer);

            if(list?.Any() ?? false)
            {
                return Ok(list);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Returns a report of closed sales
        /// </summary>
        /// <remarks>
        /// Used in Reports
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/report/closedsales")]
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<ReportClosed>> PostClosed([FromBody]ReportClosedRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = req.Customer;
            }

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new ReportRepository(ConnectionFactory).ListClosed(customer, req.TicketPrice, req.StartDate, req.EndDate);
            if (list == null || !list.Any()) return null;
            return list;
        }

        /// <summary>
        /// Returns a report of sales by price point (Dynamic)
        /// </summary>
        /// <remarks>
        /// Used in Reports
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/report/pricepointdynamic")]
        public async Task<IHttpActionResult> PostPricePointDynamic([FromBody]ReportPricePointRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = req.Customer;
            }

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new ReportRepository(ConnectionFactory).LazyListPricePointDynamic(customer, req.TicketPrice, req.StartDate, req.EndDate);

            if (list?.Any() ?? false)
            {
                return Ok(list);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Returns a report of sales by price point (Table)
        /// </summary>
        /// <remarks>
        /// Used in Reports
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/report/pricepoint")]
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<ReportPricePoint>> PostPricePoint([FromBody]ReportPricePointRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = req.Customer;
            }

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new ReportRepository(ConnectionFactory).ListPricePoint(customer, req.TicketPrice, req.StartDate, req.EndDate);
            if (list == null || !list.Any()) return null;
            return list;
        }

        /// <summary>
        /// Returns a report of top 40 sales
        /// </summary>
        /// <remarks>
        /// Used in Reports
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/report/top")]
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<ReportTop>> PostTop([FromBody]ReportTopRequest req)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = req.Customer;
            }

            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await new ReportRepository(ConnectionFactory).ListTop(customer);
            if (list == null || !list.Any()) return null;
            return list;
        }
    }
}
