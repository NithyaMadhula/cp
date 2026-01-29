using Microsoft.AspNetCore.Authorization;
using System.Text;
using System.Threading.Tasks;
using Igt.InstantsShowcase.Models.Application;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;

namespace Igt.InstantsShowcase.Areas.Identity.Pages.Account
{
    /// <summary>
    /// 
    /// </summary>
    [AllowAnonymous]
    public class RegisterConfirmationModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;        

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userManager"></param>
        public RegisterConfirmationModel(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// 
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool DisplayConfirmAccountLink { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string EmailConfirmationUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnGetAsync(string email, string returnUrl = null)
        {
            if (email == null)
            {
                return RedirectToPage("/Index");
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"Unable to load user with email '{email}'.");
            }

            Email = email;
            // Once you add a real email sender, you should remove this code that lets you confirm the account
            DisplayConfirmAccountLink = true;
            if (DisplayConfirmAccountLink)
            {
                var userId = await _userManager.GetUserIdAsync(user);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                EmailConfirmationUrl = Url.Page(
                    "/Account/ConfirmEmail",
                    pageHandler: null,
                    values: new { area = "Identity", userId, code, returnUrl },
                    protocol: Request.Scheme);
            }

            return Page();
        }
    }
}
