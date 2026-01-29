using IGT.CustomerPortal.MVC.Exceptions;
using System.Web.Mvc;
using System.Web.Routing;

namespace IGT.CustomerPortal.MVC.Filters
{
    public class IGTExceptionHandler : ActionFilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            if (filterContext.Exception.GetType() == typeof(AbsentSessionKeyException))
            {
                filterContext.ExceptionHandled = true;
                filterContext.Controller.TempData["alert_warning"] = "Session expired. Please login again.";
                filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary(new { controller = "Account", action = "Login" })
                    );
                return;
            }

            if (filterContext.Exception.GetType() == typeof(DataSourceException))
            {
                filterContext.ExceptionHandled = true;
                filterContext.Controller.TempData["alert_danger"] = "There was an error connecting to a data source! Try again in a few minutes.";
                filterContext.Result = new ViewResult {
                    ViewName = filterContext.RouteData.Values["action"].ToString(),
                    TempData = filterContext.Controller.TempData
                };
                return;
            }

            //alert_info
        }
    }
}