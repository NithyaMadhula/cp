using IGT.CustomerPortal.API.DAL;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API
{
    public class ApiTokenProvider : OAuthAuthorizationServerProvider
    {

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            return base.ValidateTokenRequest(context);
        }

        public override Task ValidateAuthorizeRequest(OAuthValidateAuthorizeRequestContext context)
        {
            return base.ValidateAuthorizeRequest(context);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            /*
            string clientId, clientSecret;


            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                //return SetErrorAndReturn(context, "client error", "");
            }

            if (clientId == "secret" && clientSecret == "secret")
            {
                context.Validated();
                return Task.FromResult<object>(null);
            }

            //return SetErrorAndReturn(context, "client error", "");
            */
            context.Validated();

            return base.ValidateClientAuthentication(context);
        }
        //public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        //{
        //    var user = await UserDal.Authenticate(context.UserName, context.Password);
        //    if (user == null)
        //    {
        //        context.SetError("Invalid credentials");
        //        return;
        //    }

        //    var identity = new ClaimsIdentity(context.Options.AuthenticationType);
        //    //identity.AddClaim(new Claim("sub", context.UserName));
        //    identity.AddClaim(new Claim("role", "user"));
        //    identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
        //    context.Validated(identity);
        //}
    }
}