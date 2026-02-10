using Igt.InstantsShowcase.Models.Repositories;
using Igt.InstantsShowcase.Models.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;


namespace Igt.InstantsShowcase.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class InstantsShowcaseControllerBase : ControllerBase
    {
        /// <summary>
        /// Data access repository
        /// </summary>
        protected CustomerPortalRepository CustomerPortal { get; set; }
        /// <summary>
        /// IdentityServer 4 user interface
        /// </summary>
        protected UserManager<ApplicationUser> UserManager { get; set; }
        /// <summary>
        /// Current request context
        /// </summary>
        protected IHttpContextAccessor Context { get; set; }

        /// <summary>
        /// 
        /// </summary>
        private ApplicationUser currentUser;

        /// <summary>
        /// Uses identity to determine current logged in application user
        /// </summary>
        protected async Task<ApplicationUser> GetCurrentUser()
        {
            if (currentUser == null)
            {
                var claimsIdentity = this.User?.Identity as ClaimsIdentity;
                var claim = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier);
                if (claim == null)
                {
                    return null;
                }

                currentUser = await UserManager.FindByIdAsync(claim.Value);
            }

            return currentUser;
        }

        /// <summary>
        /// Returns the allowed customer code unless user has the "IGT" designation
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        protected async Task<string> GetCustomerCode(string code = "")
        {
            var user = await GetCurrentUser();
            return user.OrganizationCode == "IGT" ? (code ?? "IGT"): user.OrganizationCode;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="customerPortal"></param>
        /// <param name="userManager"></param>
        public InstantsShowcaseControllerBase(IHttpContextAccessor context, CustomerPortalRepository customerPortal, UserManager<ApplicationUser> userManager)
        {
            Context = context;
            CustomerPortal = customerPortal;
            UserManager = userManager;
        }
    }
}
