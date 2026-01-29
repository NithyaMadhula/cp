using IdentityServer3.Core;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.InMemory;
using System.Collections.Generic;
using System.Security.Claims;

namespace IGT.Oauth
{
    public class InMemoryManager
    {
        public static List<InMemoryUser> GetUsers()
        {
            return new List<InMemoryUser>
            {
                new InMemoryUser
                {
                    Username = "carlos.xavierdeoliveira@igt.com",
                    Password = "igt",
                    Subject = "carlos.xavierdeoliveira@igt.com",

                    Claims = new[]
                    {
                        new Claim(Constants.ClaimTypes.Name, "Carlos"),
                        new Claim("customer", "IGT"),
                        new Claim(Constants.ClaimTypes.Role, "admin"),
                    }
                   
                }
            };
        }
        public static List<Scope> GetScopes()
        {
            return new List<Scope>
            {
                StandardScopes.OpenId,
                StandardScopes.Profile,
                StandardScopes.OfflineAccess,
                new Scope
                {
                    Name = "cpapi_read",
                    DisplayName = "Customer Portal API Read",
                    Type = ScopeType.Resource,
                    Claims = new List<ScopeClaim>
                    {
                        new ScopeClaim(Constants.ClaimTypes.Name),
                        new ScopeClaim("customer"),
                        new ScopeClaim(Constants.ClaimTypes.Role),
                    },
                    IncludeAllClaimsForUser = true
                }
            };
        }
        public static List<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    Enabled = true,
                    ClientName = "Customer Portal API",
                    ClientId = "cpapi",
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("secret".Sha256())
                    },
                    Flow = Flows.ResourceOwner,
                    AllowedScopes = new List<string>
                    {
                        Constants.StandardScopes.OpenId,
                        Constants.StandardScopes.Profile,
                        Constants.StandardScopes.OfflineAccess,
                        "cpapi_read"
                    },

                    RedirectUris = new List<string>
                    {
                        "https://localhost:44319/"
                    },

                    AllowAccessToAllScopes = true
                }
            };
        }
    }
}