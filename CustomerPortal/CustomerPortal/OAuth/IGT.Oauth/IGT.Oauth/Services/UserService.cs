using IdentityServer3.Core;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.Default;
using IGT.Oauth.Repositories;
using IGT.Oauth.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IGT.Oauth.Services
{
    public class UserService : UserServiceBase
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public override async Task AuthenticateLocalAsync(LocalAuthenticationContext context)
        {
            bool ok = false;
            var user = await _userRepository.GetAsync(context.UserName);
            if (user != null)
            {
                ok = HashHelper.BCryptVerify(user.Password, context.Password);
            }

            context.AuthenticateResult = ok ? new AuthenticateResult(user.Username, user.Username) : new AuthenticateResult("Incorrect credentials");
        }

        public override async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var username = context.Subject.Identity.Name;
            var clientid = context.Client.ClientId;
            var user = await _userRepository.GetAsync(username, clientid, true);

            if (user != null && user.Customer != null && user.Roles != null) {

                List<Claim> claims = new List<Claim>();
                claims.Add(new Claim(Constants.ClaimTypes.Name, user.FirstName));
                claims.Add(new Claim("customer", user.Customer.Code));
                foreach (var role in user.Roles)
                {
                    claims.Add(new Claim(Constants.ClaimTypes.Role, role.Name));
                }

                context.IssuedClaims = claims;
            }
            await base.GetProfileDataAsync(context);
        }
    }
}