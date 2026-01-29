using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IGT.CustomerPortal.MVC.Startup))]
namespace IGT.CustomerPortal.MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
