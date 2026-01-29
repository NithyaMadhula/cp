using Igt.InstantsShowcase.Models;
using IGT.CustomerPortal.API.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReportController : InstantsShowcaseControllerBase
    {
        public ReportController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

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
        [Route("activesales")]
        public async Task<IActionResult> PostActive([FromBody]ReportActiveRequest req)
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

            return NoContent();
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
        [Route("closedsales")]
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
        [Route("pricepointdynamic")]
        public async Task<IActionResult> PostPricePointDynamic([FromBody]ReportPricePointRequest req)
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

            return NoContent();
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
        [Route("pricepoint")]
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
        [Route("top")]
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
