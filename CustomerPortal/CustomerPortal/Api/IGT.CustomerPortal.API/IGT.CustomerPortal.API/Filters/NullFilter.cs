using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace IGT.CustomerPortal.API
{
    public sealed class NullFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Exception != null) return;

            var response = actionExecutedContext.Response;

            object responseValue;
            bool hasContent = response.TryGetContentValue(out responseValue);

            if (!hasContent && actionExecutedContext.Response.StatusCode == HttpStatusCode.OK)
            {
                throw new HttpResponseException(HttpStatusCode.NoContent);
            }
        }
    }
}