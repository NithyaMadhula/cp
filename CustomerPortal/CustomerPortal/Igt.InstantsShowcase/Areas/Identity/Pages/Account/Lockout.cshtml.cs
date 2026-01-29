using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Igt.InstantsShowcase.Areas.Identity.Pages.Account
{
    /// <summary>
    /// 
    /// </summary>
    [AllowAnonymous]
    public class LockoutModel : PageModel
    {
        /// <summary>
        /// 
        /// </summary>
        public void OnGet()
        {

        }
    }
}
