using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Igt.InstantsShowcase.Areas.Identity.Pages.Account.Manage
{

    /// <summary>
    /// 
    /// </summary>
    public static class ManageNavPages
    {
        /// <summary>
        /// 
        /// </summary>
        public static string Index => "ChangePassword";

        /// <summary>
        /// 
        /// </summary>
        public static string Email => "Email";

        /// <summary>
        /// 
        /// </summary>
        public static string ChangePassword => "ChangePassword";

        /// <summary>
        /// 
        /// </summary>
        public static string DownloadPersonalData => "DownloadPersonalData";

        /// <summary>
        /// 
        /// </summary>
        public static string DeletePersonalData => "DeletePersonalData";

        /// <summary>
        /// 
        /// </summary>
        public static string ExternalLogins => "ExternalLogins";

        /// <summary>
        /// 
        /// </summary>
        public static string PersonalData => "PersonalData";

        /// <summary>
        /// 
        /// </summary>
        public static string TwoFactorAuthentication => "TwoFactorAuthentication";

        /// <summary>
        /// 
        /// </summary>
        public static string IndexNavClass(ViewContext viewContext) => PageNavClass(viewContext, Index);

        /// <summary>
        /// 
        /// </summary>
        public static string EmailNavClass(ViewContext viewContext) => PageNavClass(viewContext, Email);

        /// <summary>
        /// 
        /// </summary>
        public static string ChangePasswordNavClass(ViewContext viewContext) => PageNavClass(viewContext, ChangePassword);

        /// <summary>
        /// 
        /// </summary>
        public static string DownloadPersonalDataNavClass(ViewContext viewContext) => PageNavClass(viewContext, DownloadPersonalData);

        /// <summary>
        /// 
        /// </summary>
        public static string DeletePersonalDataNavClass(ViewContext viewContext) => PageNavClass(viewContext, DeletePersonalData);

        /// <summary>
        /// 
        /// </summary>
        public static string ExternalLoginsNavClass(ViewContext viewContext) => PageNavClass(viewContext, ExternalLogins);

        /// <summary>
        /// 
        /// </summary>
        public static string PersonalDataNavClass(ViewContext viewContext) => PageNavClass(viewContext, PersonalData);

        /// <summary>
        /// 
        /// </summary>
        public static string TwoFactorAuthenticationNavClass(ViewContext viewContext) => PageNavClass(viewContext, TwoFactorAuthentication);

        /// <summary>
        /// 
        /// </summary>
        private static string PageNavClass(ViewContext viewContext, string page)
        {
            var activePage = viewContext.ViewData["ActivePage"] as string
                ?? System.IO.Path.GetFileNameWithoutExtension(viewContext.ActionDescriptor.DisplayName);
            return string.Equals(activePage, page, StringComparison.OrdinalIgnoreCase) ? "active" : null;
        }
    }
}
