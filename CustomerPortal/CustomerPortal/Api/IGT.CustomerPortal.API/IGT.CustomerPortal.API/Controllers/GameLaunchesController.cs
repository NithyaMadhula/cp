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
    public class GameLaunchesController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /// <summary>
        /// Returns game launches info based on search criteria
        /// </summary>
        /// <remarks>
        /// Used in Game Launch
        /// 
        /// Data
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [SwaggerResponse(HttpStatusCode.NoContent, Description = "No Content", Type = typeof(string))]
        public async Task<IEnumerable<GameLaunch>> Post([FromBody]GameLaunchesRequest req)
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

            if (string.IsNullOrEmpty(customer) || !req.Year.HasValue)
            {
                ApiWorkflowHelper.AbortBadRequest();
            }

            var list = await Process(req.Year.Value, customer,
                req.TicketPrice ?? -1,
                req.IncludePriorYear ?? 0,
                req.ShowIndex ?? 1,
                req.FiscalYear ?? 0
                );
            if (list == null || !list.Any()) return null;
            //GameLaunch.ConceptsUrl = this.GetFullConceptsUri();

            return list;
        }

        private async Task<IEnumerable<GameLaunch>> Process(int year, string code, int ticketPrice,
            int includePriorYear, int showIndex, int fiscalYear)
        {
            return await new GameLaunchRepository(ConnectionFactory).List(year, code, ticketPrice, includePriorYear, showIndex, fiscalYear);
        }

    }
}
