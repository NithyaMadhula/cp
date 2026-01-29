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
    public class PersonalDataModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userManager"></param>
        public PersonalDataModel(
            UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// 
        /// </summary>
        public async Task<IActionResult> OnGet()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            return Page();
        }
    }
}