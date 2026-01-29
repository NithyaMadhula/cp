using System.Web;
using System.Web.Optimization;

namespace IGT.CustomerPortal.MVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/site").Include(
                              "~/Scripts/sb-admin-2.js"
                              ));

            bundles.Add(new StyleBundle("~/Content/landing").Include(
                                  "~/Content/bootstrap.css",
                                  "~/Content/igt-colors.css",
                                  "~/Content/full-width-pics.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/login").Include(
                      "~/Content/sb-admin-igt.css"));

            bundles.Add(new StyleBundle("~/Content/site").Include(
                "~/Content/fontawesome-free/css/all.min.css",
                "~/Content/sb-admin-igt.css"
                ));

            bundles.Add(new StyleBundle("~/Content/logged").Include(
                "~/Content/fontawesome-free/css/all.min.css",
                "~/Content/sb-admin-igt.css",
                "~/Content/igt-layout.css",
                "~/Content/igt-colors.css"));

        }
    }
}
