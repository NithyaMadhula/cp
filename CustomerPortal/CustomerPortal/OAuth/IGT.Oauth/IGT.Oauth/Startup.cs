using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services;
using IdentityServer3.Core.Services.InMemory;
using IdentityServer3.Dapper;
using IGT.Oauth.Models;
using IGT.Oauth.Repositories;
using IGT.Oauth.Services;
using IGT.Oauth.Utils;
using Microsoft.Owin;
using Owin;
using System.Collections.Generic;

[assembly: OwinStartup(typeof(IGT.Oauth.Startup))]

namespace IGT.Oauth
{
    public class Startup
    {
        readonly bool FIRST_RUN = false; // Warning! Setting to true will add default values in the database!

        public void Configuration(IAppBuilder app)
        {
            const string CONNECTION_STRING_NAME = "Default";

            var connectionFactory = new DbConnectionFactory();

            var dapperServiceOptions = new DapperServiceOptions(() => connectionFactory.GetConnectionByName(CONNECTION_STRING_NAME));
            var userRepository = new UserRepository(() => connectionFactory.GetConnectionByName(CONNECTION_STRING_NAME));

            SetupClients(InMemoryManager.GetClients(), dapperServiceOptions);
            SetupScopes(InMemoryManager.GetScopes(), dapperServiceOptions);
            SetupUsers(InMemoryManager.GetUsers(), dapperServiceOptions);

            var factory = new IdentityServerServiceFactory();
            //.UseInMemoryClients(InMemoryManager.GetClients())
            //.UseInMemoryScopes(InMemoryManager.GetScopes())
            //.UseInMemoryUsers(InMemoryManager.GetUsers());

            factory.RegisterConfigurationServices(dapperServiceOptions);
            factory.RegisterOperationalServices(dapperServiceOptions);
            factory.UserService = new Registration<IUserService>(typeof(UserService));
            factory.Register(new Registration<IUserRepository>(userRepository));

            factory.ClientStore = new Registration<IClientStore, CustomClientStore>();


            var options = new IdentityServerOptions
            {
                SiteName = "IGT IdentityServer",
                SigningCertificate = CertificateHelper.Load(),
                RequireSsl = false,
                Factory = factory
            };

            app.UseIdentityServer(options);
        }

        void SetupClients(IEnumerable<Client> clients, DapperServiceOptions options)
        {
            if (!FIRST_RUN) return;

            var repository = new ClientRepository(() => options.OpenConnection());
            repository.Insert(clients);
        }

        void SetupScopes(IEnumerable<Scope> scopes, DapperServiceOptions options)
        {
            if (!FIRST_RUN) return;

            var repository = new ScopeRepository(() => options.OpenConnection());
            repository.Insert(scopes);
        }

        void SetupUsers(IEnumerable<InMemoryUser> users, DapperServiceOptions options)
        {
            if (!FIRST_RUN) return;

            var repository = new UserRepository(() => options.OpenConnection());

            foreach (var user in users)
            {
                var model = new User
                {
                    Username = user.Username,
                    Password = user.Password
                };
                repository.Insert(model);
            }
        }
    }
    
}
