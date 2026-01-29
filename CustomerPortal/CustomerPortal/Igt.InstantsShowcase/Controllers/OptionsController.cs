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
    public class OptionsController : InstantsShowcaseControllerBase
    {
        private static readonly List<dynamic> CUSTOMER_TYPE = new List<dynamic>
        {
            new { Key = "0", Value = "Domestic" },
            new { Key = "1", Value = "International" }
        };

        private static readonly List<dynamic> RATE_OF_SALES_GAME_TYPES = new List<dynamic>
        {
            new { Key = "0", Value = "All Games" },
            new { Key = "1", Value = "Extended Play" },
            new { Key = "2", Value = "Non Extended Play" },
        };

        private static readonly List<dynamic> VENDORS = new List<dynamic>
        {
            new { Key = "0", Value = "IGT" },
            new { Key = "1", Value = "Non-IGT" },
            new { Key = "2", Value = "All" }
        };

        private static readonly List<dynamic> YEAR_TYPES = new List<dynamic>
        {
            new {Key = "0", Value = "Calendar Year" },
            new {Key = "1", Value = "Fiscal Year" }
        };

    public OptionsController(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager) : base(context, customerPortal, userManager) { }

        /// <summary>
        /// Returns a list of customer types (domestic or international) 
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current, Game Search, Penetration Charts
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpGet]
        [Route("customer-types")]
        public List<dynamic> GetCustomerTypes() => CUSTOMER_TYPE;

        [HttpGet]
        [Route("ros-game-types")]
        public List<dynamic> GetRosGameTypes() => RATE_OF_SALES_GAME_TYPES;

        /// <summary>
        /// Returns a list of vendor types 
        /// </summary>
        /// <remarks>
        /// Used in Reports
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpGet]
        [Route("sales-report-types")]
        public IEnumerable<ReportType> Get()
        {
            return new List<ReportType>
                {
                        new ReportType
                        {
                            Id = 1,
                            Name = "Current Active Game Sales and Sell-Th-ru",
                            ApiPath = "/report/activesales"
                        },
                        new ReportType
                        {
                            Id = 2,
                            Name = "Closed Games Sales & Sell-Thru",
                            ApiPath = "/report/closedsales"
                        },
                        new ReportType
                        {
                            Id = 3,
                            Name = "Sales & Sell-Thru By Selected Price Point",
                            ApiPath = "/report/pricepointdynamic"
                        },
                        new ReportType
                        {
                            Id = 4,
                            Name = "Top 40 Sales",
                            ApiPath = "/report/top"
                        },
                };
        }

        /// <summary>
        /// Returns a list of vendor types 
        /// </summary>
        /// <remarks>
        /// Used in Reports
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpGet]
        [Route("vendors")]
        public IEnumerable<dynamic> GetVendors() => VENDORS;

        /// <summary>
        /// Returns a list of year types 
        /// </summary>
        /// <remarks>
        /// Used in Dashboard current
        /// 
        /// Filter
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Ok</response>
        /// 
        [HttpGet]
        [Route("year-types")]
        public IEnumerable<dynamic> GetYearTypes() => YEAR_TYPES;
    }
}
