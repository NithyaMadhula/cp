using System.Web.Mvc;

namespace IGT.CustomerPortal.MVC.Controllers
{
    [Authorize]
    public class DashboardController : PortalControllerBase
    {
        public ActionResult Index()
        {
            SetPageTitle("Dashboard");
            ActiveMenu = "dashboard";

            return View();
        }
    }
}