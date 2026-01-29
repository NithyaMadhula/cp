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
    public class DetailedGameSearchController : InstantsShowcaseControllerBase
    {
        public DetailedGameSearchController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of games based on a search criteria
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        public async Task<IEnumerable<DetailedGameSearch>> Post([FromBody]DetailedGameSearchRequest req)
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

            var list = await new DetailedGameSearchRepository(ConnectionFactory).List(customer,
                req.GameName ?? "",
                req.TicketPrice ?? -1,
                req.Year ?? -1,
                req.Theme ?? "",
                req.Color ?? "",
                req.PlayStyle ?? "",
                req.PageSize ?? -1,
                req.PageIndex ?? -1);

            if (list == null || !list.Any()) return null;
            //DetailedGameSearch.ConceptsUrl = this.GetFullConceptsUri();
            return list;
        }

        /// <summary>
        /// Returns a list of metadata for the detailed game search
        /// </summary>
        /// <remarks>
        /// Used in Game Search
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        [HttpPost]
        [Route("api/detailedgamesearch/metadata")]
        public async Task<MetadataDetailedGameSearch> Metadata([FromBody]MetadataDetailedGameSearchRequest req)
        {
            req = req ?? new MetadataDetailedGameSearchRequest();
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
            }
            else
            {
                customer = req.Customer;
            }

            //if (string.IsNullOrEmpty(customer))
            //{
            //    ApiWorkflowHelper.AbortBadRequest();
            //}

            var repository = new DetailedGameSearchRepository(ConnectionFactory);
            var customerRepository = new CustomerRepository(ConnectionFactory);
            var response = new MetadataDetailedGameSearch();
            response.TicketPrice = await repository.ListMetadataTicketPrice(customer);
            response.LicensedProperty = new List<string> { "true", "false" };
            response.PrimaryColorName = await repository.ListMetadataPrimaryColorName(customer);
            response.PrimaryThemeName = await repository.ListMetadataPrimaryThemeName(customer);
            response.PrimaryPlayStyleName = await repository.ListMetadataPrimaryPlayStyleName(customer);
            // Terrible workaround just to avoid blocking Jetfuel
            var customers = await customerRepository.List(0);
            response.Customer = customers.Select(c => c.Code.Trim());
            return response;


            //var model = await new DetailedGameSearchRepository(ConnectionFactory).ListMetadata(customer);
            //return new MetadataDetailedGameSearch(model);
        }

        [Route("api/detailedgamesearch/test")]
        [HttpPost]
        public IEnumerable<DetailedGameSearch> Test([FromBody]DetailedGameSearchRequest req)
        {
            string customer = null;
            customer = req.Customer;

            var list = new DetailedGameSearchRepository(ConnectionFactory).Test(customer,
                req.GameName ?? "",
                req.TicketPrice ?? -1,
                req.Year ?? -1,
                req.Theme ?? "",
                req.Color ?? "",
                req.PlayStyle ?? "",
                req.PageSize ?? -1,
                req.PageIndex ?? -1);

            if (list == null || !list.Any()) return null;
            return list;
        }
    }
}
