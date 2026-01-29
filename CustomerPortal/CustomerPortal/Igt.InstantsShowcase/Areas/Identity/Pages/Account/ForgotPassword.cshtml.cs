using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Encodings.Web;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Igt.InstantsShowcase.Models.Application;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Igt.InstantsShowcase.Models;

namespace Igt.InstantsShowcase.Areas.Identity.Pages.Account
{
    /// <summary>
    /// 
    /// </summary>
    [AllowAnonymous]
    public class ForgotPasswordModel : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<ForgotPasswordModel> _logger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="emailSender"></param>
        /// <param name="logger"></param>
        public ForgotPasswordModel(UserManager<ApplicationUser> userManager, IEmailSender emailSender, ILogger<ForgotPasswordModel> logger)
        {
            _userManager = userManager;
            _emailSender = emailSender;
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
        public class InputModel
        {

            /// <summary>
            /// 
            /// </summary>
            [Required]
            [EmailAddress]
            public string Email { get; set; }
        }

        /// <summary>
        /// 
        /// </summary>
        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(Input.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToPage("./ForgotPasswordConfirmation");
                }

                var dictionary = new Dictionary<string, string>() { { "user", Input.Email }, { "applicationEventType", "FORGOT PASSWORD" } };
                dictionary.Add("userIP", Request.HttpContext.Connection.RemoteIpAddress.ToString());

                // For more information on how to enable account confirmation and password reset please 
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = Url.Page(
                    "/Account/ResetPassword",
                    pageHandler: null,
                    values: new { area = "Identity", code },
                    protocol: Request.Scheme);

                var body = $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.";
                var emailTemplate = new EmailTemplate(body);
                //await _emailSender.SendEmailAsync(Input.Email, "Instantsshowcase - Confirm your email",
                //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                await _emailSender.SendEmailAsync(Input.Email, "Instantsshowcase - Reset Password", emailTemplate.GetTemplate());

                using (var scope = _logger.BeginScope(dictionary))
                {
                    _logger.LogInformation($"User has forgotten password, reset at {HtmlEncoder.Default.Encode(callbackUrl)}");
                }

                return RedirectToPage("./ForgotPasswordConfirmation");
            }

            return Page();
        }
    }
}
