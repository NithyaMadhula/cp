using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Igt.InstantsShowcase.Models.Application;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using log4net;

namespace Igt.InstantsShowcase.Areas.Identity.Pages.Account
{
    /// <summary>
    /// 
    /// </summary>
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="signInManager"></param>
        /// <param name="logger"></param>
        public LoginModel(SignInManager<ApplicationUser> signInManager,
            ILogger<LoginModel> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
        }

        /// <summary>
        /// 
        /// </summary>
        [BindProperty]
        public InputModel Input { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ReturnUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [TempData]
        public string ErrorMessage { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public class InputModel
        {
            /// <summary>
            /// 
            /// </summary>
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            /// <summary>
            /// 
            /// </summary>
            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            /// <summary>
            /// 
            /// </summary>
            [Display(Name = "Remember me?")]
            public bool RememberMe { get; set; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }

            returnUrl ??= Url.Content("~/");

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            ReturnUrl = returnUrl;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");

            if (ModelState.IsValid)
            {
                try
                {
                    var dictionary = new Dictionary<string, string>() { { "user", Input.Email } };
                    
                    // This doesn't count login failures towards account lockout
                    // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                    var result = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, Input.RememberMe, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        dictionary.Add("applicationEventType", "LOGIN");
                        dictionary.Add("userIP", Request.HttpContext.Connection.RemoteIpAddress.ToString());
                        using (var scope = _logger.BeginScope(dictionary))
                        {
                            _logger.LogInformation("user has logged in"); 
                        }
                        _logger.LogInformation("User logged in.");
                        return LocalRedirect(returnUrl);
                    }
                    if (result.RequiresTwoFactor)
                    {
                        return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, Input.RememberMe });
                    }
                    if (result.IsLockedOut)
                    {
                        _logger.LogWarning("User account locked out.");
                        return RedirectToPage("./Lockout");
                    }
                    else
                    {
                        dictionary.Add("applicationEventType", "LOGIN ERROR");
                        dictionary.Add("userIP", Request.HttpContext.Connection.RemoteIpAddress.ToString());
                        using (var scope = _logger.BeginScope(dictionary))
                        {
                            _logger.LogWarning($"User could not login.");
                        }
                        ModelState.AddModelError("Input.Password", "Incorrect user name or password.");
                        return Page();
                    }
                }
                catch (Exception x)
                {
                    ModelState.AddModelError("Input.Password", "An error occured while logging in - please contact support.");

                    return Page();
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
