using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Igt.InstantsShowcase.Controllers
{

    /// <summary>
    /// 
    /// </summary>
    public class OidcConfigurationController : Controller
    {
        private readonly ILogger<OidcConfigurationController> _logger;

        /// <summary>
        /// 
        /// </summary>
        public OidcConfigurationController(IClientRequestParametersProvider clientRequestParametersProvider, ILogger<OidcConfigurationController> logger)
        {
            ClientRequestParametersProvider = clientRequestParametersProvider;
            _logger = logger;
        }

        /// <summary>
        /// 
        /// </summary>
        public IClientRequestParametersProvider ClientRequestParametersProvider { get; }

        /// <summary>
        /// 
        /// </summary>
        [HttpGet("_configuration/{clientId}")]
        public IActionResult GetClientRequestParameters([FromRoute] string clientId)
        {
            var parameters = ClientRequestParametersProvider.GetClientParameters(HttpContext, clientId);
            return Ok(parameters);
        }
    }
}
