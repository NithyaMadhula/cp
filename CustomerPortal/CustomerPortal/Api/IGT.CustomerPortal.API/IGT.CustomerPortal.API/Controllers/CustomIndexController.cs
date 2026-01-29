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
    public class CustomIndexController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns basic index info based on search criteria
        /// </summary>
        /// <remarks>
        /// Used in Indexing
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/customindex/basic")]        
        public async Task<IHttpActionResult> PostBasic([FromBody]CustomIndexBasicRequest req)
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

            var list = await new CustomIndexRepository(ConnectionFactory).ListBasic(customer,
                req.TicketPrice,
                req.StartDate,
                req.EndDate,
                req.IndexWeek
                );

            if (list?.Any() ?? false)
            {
                return Ok(list);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Returns advanced index info based on search criteria
        /// </summary>
        /// <remarks>
        /// Used in Indexing
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/customindex/advanced")]
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<CustomIndexAdvanced>> PostAdvanced([FromBody]CustomIndexAdvancedRequest req)
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

            var list = await new CustomIndexRepository(ConnectionFactory).ListAdvanced(customer,
                req.IndexWeek,
                req.TicketPrice,
                req.StartDate,
                req.EndDate,
                req.ScoreMin,
                req.ScoreMax,
                req.IsExcludeCrossword,
                req.IsExcludeBingo,
                req.IsExcludeHoliday,
                req.IsLicensedProperty,
                req.ThemeID,
                req.FeatureID,
                req.PlayStyleID,
                req.GameName,
                req.TopPrizeAmt
                );
            if (list == null || !list.Any()) return null;
            return list;
        }
    }
}
