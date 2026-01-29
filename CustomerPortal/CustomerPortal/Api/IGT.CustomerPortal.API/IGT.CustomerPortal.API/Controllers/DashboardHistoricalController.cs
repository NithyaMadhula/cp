using IGT.CustomerPortal.API.DTO;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.DTO.Response;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorizeAllButClients]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class DashboardHistoricalController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        /**
         * Entry point for Dashboard Current 
         */
        [HttpPost]
        public async Task<ApiFunctionalityResponse> Post([FromBody]ApiFunctionalityRequest request)
        {
            string username;
            this.GetUsername(out username);

            ApiFunctionalityRequest actualRequest = request ?? new ApiFunctionalityRequest();
            return await EventHandler(actualRequest);
        }

        async Task<ApiFunctionalityResponse> EventHandler(ApiFunctionalityRequest request)
        {
            ApiFunctionalityResponse response = new ApiFunctionalityResponse();
            switch (request.Event.ToLower())
            {
                case "init":
                    response.Sections = await Init_Event();
                    break;
            }
            return response;
        }

        async Task<IEnumerable<ApiFunctionalitySection>> Init_Event()
        {
            return null;
        }
    }
}
