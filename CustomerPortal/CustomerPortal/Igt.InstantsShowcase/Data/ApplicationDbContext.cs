using Duende.IdentityServer.EntityFramework.Options;
using Igt.InstantsShowcase.Models.Application;
//using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Igt.InstantsShowcase.Data
{
    /// <summary>
    /// 
    /// </summary>
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        /// <param name="operationalStoreOptions"></param>
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
    }
}
