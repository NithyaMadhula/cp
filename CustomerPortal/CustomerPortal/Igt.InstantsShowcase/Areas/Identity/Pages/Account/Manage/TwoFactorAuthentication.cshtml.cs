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
    public class TwoFactorAuthenticationModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="signInManager"></param>
        public TwoFactorAuthenticationModel(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        /// <summary>
        /// 
        /// </summary>
        public bool HasAuthenticator { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int RecoveryCodesLeft { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [BindProperty]
        public bool Is2faEnabled { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool IsMachineRemembered { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [TempData]
        public string StatusMessage { get; set; }

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

            HasAuthenticator = await _userManager.GetAuthenticatorKeyAsync(user) != null;
            Is2faEnabled = await _userManager.GetTwoFactorEnabledAsync(user);
            IsMachineRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user);
            RecoveryCodesLeft = await _userManager.CountRecoveryCodesAsync(user);

            return Page();
        }

        /// <summary>
        /// 
        /// </summary>
        public async Task<IActionResult> OnPost()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await _signInManager.ForgetTwoFactorClientAsync();
            StatusMessage = "The current browser has been forgotten. When you login again from this browser you will be prompted for your 2fa code.";
            return RedirectToPage();
        }
    }
}