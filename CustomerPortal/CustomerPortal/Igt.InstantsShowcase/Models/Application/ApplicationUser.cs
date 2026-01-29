using Microsoft.AspNetCore.Identity;

namespace Igt.InstantsShowcase.Models.Application
{
    /// <summary>
    /// 
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        /// <summary>
        /// Subdivision or jurisdiction code of lottery/organization
        /// </summary>
        public string OrganizationCode {get; set;}
    }
}
