using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Igt.InstantsShowcase.Models.Application;
using Igt.InstantsShowcase.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;

namespace Igt.InstantsShowcase.Areas.Identity.Pages.Account
{
    /// <summary>
    /// 
    /// </summary>
    [AllowAnonymous]
    public class RegisterConfirmationModel : PageModel
    {
        private const string AccessRequestRecipients = "Gonzalo.Garcia@brightstarlottery.com,Nithya.Madhulapally@brightstarlottery.com,Ryan.Mcshane@brightstarlottery.com";

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<RegisterConfirmationModel> _logger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="emailSender"></param>
        /// <param name="logger"></param>
        public RegisterConfirmationModel(
            UserManager<ApplicationUser> userManager,
            IEmailSender emailSender,
            ILogger<RegisterConfirmationModel> logger)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _logger = logger;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Email { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [TempData]
        public bool AccessRequestSubmitted { get; set; }

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
        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [Display(Name = "First Name")]
            [StringLength(100)]
            public string FirstName { get; set; }

            [Required]
            [Display(Name = "Last Name")]
            [StringLength(100)]
            public string LastName { get; set; }

            [Required]
            [Phone]
            [StringLength(50)]
            public string Phone { get; set; }

            [Required]
            [Display(Name = "Company / Organization")]
            [StringLength(200)]
            public string Company { get; set; }

            [Display(Name = "Client ID")]
            [StringLength(100)]
            public string ClientId { get; set; }
        }

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
            Input = new InputModel
            {
                Email = email
            };

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

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            Email = Input?.Email;

            if (!ModelState.IsValid)
            {
                await LoadConfirmationStateAsync(Input?.Email, returnUrl);
                return Page();
            }

            var user = await _userManager.FindByEmailAsync(Input.Email);
            if (user == null)
            {
                return NotFound($"Unable to load user with email '{Input.Email}'.");
            }

            var encoder = HtmlEncoder.Default;
            var accessRequestBody =
                $"Please activate the following account:<br><br>" +
                $"Email: {encoder.Encode(Input.Email)}<br>" +
                $"First Name: {encoder.Encode(Input.FirstName)}<br>" +
                $"Last Name: {encoder.Encode(Input.LastName)}<br>" +
                $"Phone: {encoder.Encode(Input.Phone)}<br>" +
                $"Company / Organization: {encoder.Encode(Input.Company)}<br>" +
                $"Client ID: {encoder.Encode(Input.ClientId ?? string.Empty)}";

            try
            {
                await _emailSender.SendEmailAsync(
                    AccessRequestRecipients,
                    "Instantsshowcase - Access Request",
                    new EmailTemplate(accessRequestBody).GetTemplate());
            }
            catch (System.Exception ex)
            {
                _logger.LogWarning(ex, "Access request email sending failed for {Email}.", Input.Email);
                // also log AccessRequestRecipients to identify missing or invalid email addresses in configuration
                _logger.LogWarning("Access request recipients: {Recipients}", AccessRequestRecipients);
                ModelState.AddModelError(string.Empty, "We couldn't send your access request right now. Please try again.");
                await LoadConfirmationStateAsync(Input.Email, returnUrl);
                return Page();
            }

            AccessRequestSubmitted = true;
            StatusMessage = "Your access request has been submitted.";
            return RedirectToPage(new { email = Input.Email, returnUrl });
        }

        private async Task LoadConfirmationStateAsync(string email, string returnUrl)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return;
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return;
            }

            Email = email;
            DisplayConfirmAccountLink = true;

            var userId = await _userManager.GetUserIdAsync(user);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            EmailConfirmationUrl = Url.Page(
                "/Account/ConfirmEmail",
                pageHandler: null,
                values: new { area = "Identity", userId, code, returnUrl },
                protocol: Request.Scheme);
        }
    }
}
