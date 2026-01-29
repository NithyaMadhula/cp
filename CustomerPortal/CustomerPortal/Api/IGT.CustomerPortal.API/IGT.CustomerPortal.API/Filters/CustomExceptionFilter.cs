using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace IGT.CustomerPortal.API
{
    public class CustomExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception.GetType() == typeof(HttpResponseException)) {
                if (((HttpResponseException)context.Exception).Response.StatusCode == HttpStatusCode.NoContent) return;
            }

            context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
        }
    }
}