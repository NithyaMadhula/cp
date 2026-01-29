using IGT.CustomerPortal.MVC.Exceptions;
using IGT.CustomerPortal.MVC.Filters;
using System.Web.Mvc;

namespace IGT.CustomerPortal.MVC.Controllers
{
    [IGTExceptionHandler]
    public abstract class PortalControllerBase : Controller
    {
        const string TOKEN_KEY = "apiAccessToken";

        public string AccessToken {
            get
            {
                var tmp = Session[TOKEN_KEY];
                if (tmp == null) { throw new AbsentSessionKeyException(); }
                return tmp.ToString();
            }
            set
            {
                Session.Add(TOKEN_KEY, value);
            }
        }

        public string ActiveMenu {
            set
            {
                ViewBag.ActiveMenu = value;
            }
        }


        public void SetPageTitle(string title, string delimiter = null)
        {
            if (!string.IsNullOrEmpty(delimiter))
            {
                ViewBag.PageTitleParts = title.Split(delimiter[0]);
                ViewBag.PageTitle = string.Join(" - ", title.Split(delimiter[0]));
            }
            else
            {
                ViewBag.PageTitle = title;
            }
        }
    }
}