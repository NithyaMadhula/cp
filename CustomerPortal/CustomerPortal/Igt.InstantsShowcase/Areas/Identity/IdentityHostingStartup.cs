using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(Igt.InstantsShowcase.Areas.Identity.IdentityHostingStartup))]
namespace Igt.InstantsShowcase.Areas.Identity
{
    /// <summary>
    /// 
    /// </summary>
    public class IdentityHostingStartup : IHostingStartup
    {
        /// <summary>
        /// 
        /// </summary>
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}