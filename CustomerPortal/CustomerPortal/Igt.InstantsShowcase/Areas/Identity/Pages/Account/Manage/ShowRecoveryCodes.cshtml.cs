using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Igt.InstantsShowcase.Models.Application;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Igt.InstantsShowcase.Areas.Identity.Pages.Account.Manage
{
    /// <summary>
    /// 
    /// </summary>
    public class ShowRecoveryCodesModel : PageModel
    {
        /// <summary>
        /// 
        /// </summary>
        [TempData]
        public string[] RecoveryCodes { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [TempData]
        public string StatusMessage { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public IActionResult OnGet()
        {
            if (RecoveryCodes == null || RecoveryCodes.Length == 0)
            {
                return RedirectToPage("./TwoFactorAuthentication");
            }

            return Page();
        }
    }
}
