using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Controllers;
using Thinktecture.IdentityModel.WebApi;

namespace IGT.CustomerPortal.API
{
    public class DefaultIgtAuthorize : ScopeAuthorizeAttribute
    {
        readonly string[] roles;
        bool insufficient_role;

        public DefaultIgtAuthorize() : this(new[] { "all" })
        {
            
        }

        public DefaultIgtAuthorize(string[] roles) : base(new[] { "cpapi_read" })
        {
            this.roles = roles;
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var ok = base.IsAuthorized(actionContext);
            if (!ok) return ok;

            if (roles.Intersect(new[] { "all" }).Any()) return true;

            var user = ((ApiController)actionContext.ControllerContext.Controller).User;
            var userRoles = ((ClaimsPrincipal)user).Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);

            ok = userRoles.Intersect(roles).Any();
            insufficient_role = !ok;
            return ok;
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            if (!insufficient_role)
            {
                base.HandleUnauthorizedRequest(actionContext);
            }
            else
            {
                actionContext.Response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.Forbidden,
                    Content = new StringContent("{\"message\":\"insufficient_role\"}", System.Text.Encoding.UTF8, "application/json")
            };
            }
        }
    }

    public class DefaultIgtAuthorizeAllButClients : DefaultIgtAuthorize
    {
        public DefaultIgtAuthorizeAllButClients() : base(new[] { "administrator", "content_manager", "igt_user" })
        {

        }
    }
}