using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Microsoft.Owin.Cors;
using IdentityServer3.AccessTokenValidation;
using Autofac;
using System.Reflection;
using IGT.Utils.Databases;
using Autofac.Integration.WebApi;
using System.Configuration;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Swashbuckle.Application;
using System.IO;
using System;
using Swashbuckle.Swagger.Annotations;
using System.Net;

[assembly: OwinStartup(typeof(IGT.CustomerPortal.API.Startup))]

namespace IGT.CustomerPortal.API
{
    public class Startup
    {
        public static HttpConfiguration HttpConfiguration { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            ConfigureWebApi(app);
        }

        void ConfigureWebApi(IAppBuilder app)
        {
            HttpConfiguration = new HttpConfiguration();

            HttpConfiguration.MapHttpAttributeRoutes();
            HttpConfiguration.Routes.MapHttpRoute(
                  name: "DefaultApi",
                  routeTemplate: "api/{controller}/{id}",
                  defaults: new { id = RouteParameter.Optional }
             );

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            //ActivateTokenGeneration(app);
            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = ConfigurationManager.AppSettings["TokenAuthenticationAuthority"]
            });

            HttpConfiguration.Filters.Add(new CustomExceptionFilter());
            HttpConfiguration.Filters.Add(new NullFilter());

            var builder = new ContainerBuilder();
            builder.Register(c => new DbConnectionFactory()).As<IDbConnectionFactory>();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly()).PropertiesAutowired();

            var container = builder.Build();
            app.UseAutofacMiddleware(container);
            //DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            HttpConfiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(HttpConfiguration);

            HttpConfiguration.Formatters.Clear();
            HttpConfiguration.Formatters.Add(new System.Net.Http.Formatting.JsonMediaTypeFormatter());
            HttpConfiguration.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            HttpConfiguration.Formatters.JsonFormatter.SerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                NullValueHandling = NullValueHandling.Ignore
            };

            string xmlPath = Path.Combine(AppDomain.CurrentDomain.GetData("DataDirectory").ToString(), "XmlDocument.xml");
            HttpConfiguration
                .EnableSwagger(c => {
                    c.SingleApiVersion("v1", "A title for your API");
                    //c.IncludeXmlComments(xmlPath);
                    //c.GroupActionsBy(apiDesc => apiDesc.HttpMethod.ToString());
                })
                .EnableSwaggerUi(c =>
                {
                    c.SupportedSubmitMethods();
                });

            app.UseWebApi(HttpConfiguration);
        }

        //private void ActivateTokenGeneration(IAppBuilder app)
        //{
        //    var options = new OAuthAuthorizationServerOptions()
        //    {
        //        AllowInsecureHttp = true,
        //        TokenEndpointPath = new PathString("/token"),
        //        AccessTokenExpireTimeSpan = TimeSpan.FromHours(1),
        //        Provider = new ApiTokenProvider()
        //    };
        //    app.UseOAuthAuthorizationServer(options);
        //    app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        //}
    }
}
