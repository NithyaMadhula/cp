using System.Security.Claims;
using System.Web.Http;
using System.Linq;
using System.Collections.Generic;
using System;
using System.Configuration;
using System.IO;

namespace IGT.CustomerPortal.API.Controllers
{
    public static class ApiControllerExtensions
    {
        public static bool TryGetUsername(this ApiController controller, out string username)
        {
            var identity = (ClaimsIdentity)controller.User.Identity;
            username = identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            return !string.IsNullOrEmpty(username);
        }

        public static void GetUsername(this ApiController controller, out string username)
        {
            if (!TryGetUsername(controller, out username))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }
        }

        public static void GetCustomer(this ApiController controller, out string customer)
        {
            customer = ((ClaimsPrincipal)controller.User).Claims.FirstOrDefault(c => c.Type == "customer")?.Value;
            if (string.IsNullOrEmpty(customer))
            {
                ApiWorkflowHelper.AbortBadRequest();
            }
        }

        public static bool IsIGT(this ApiController controller)
        {
            string customer;
            GetCustomer(controller, out customer);
            return customer.ToUpper().Equals("IGT");
        }

        public static bool ContainsRoles(this ApiController controller, IEnumerable<string> roles)
        {
            var presentRoles = ((ClaimsPrincipal)controller.User).Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            return presentRoles.Intersect(roles).Any();
        }

        public static bool HasPermission(this ApiController controller)
        {
            var name = controller.GetType().Name;

            var permissions = new List<Tuple<string, string[]>>();
            permissions.Add(new Tuple<string, string[]>("YearTypeController", new[] { "administrator", "content_manager", "client", "igt_user" }));
            permissions.Add(new Tuple<string, string[]>("CustomerTypeController", new[] { "administrator", "content_manager", "client", "igt_user" }));
            permissions.Add(new Tuple<string, string[]>("LotteryController", new[] { "administrator", "content_manager", "client", "igt_user" }));
            permissions.Add(new Tuple<string, string[]>("InstantWeeklySalesController", new[] { "administrator", "content_manager", "client", "igt_user" }));

            var permission = permissions.FirstOrDefault(p => p.Item1.Equals(name));
            if (permission == null) return false;

            if (permission.Item2.Intersect(new[] { "public" }).Any()) return true;

            var userRoles = ((ClaimsPrincipal)controller.User).Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            return userRoles.Intersect(permission.Item2).Any();
        }

        public static string GetFullConceptsUri(this ApiController controller, string imageName = "")
        {
            string path = ConfigurationManager.AppSettings["ConceptsBaseUri"];
            return Path.Combine(path, imageName);
        }
    }
}
