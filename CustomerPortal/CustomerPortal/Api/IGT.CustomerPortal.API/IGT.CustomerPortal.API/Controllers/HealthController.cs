using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    public class HealthController : ApiController
    {
        [HttpGet]
        [Route("api/health")]
        public IHttpActionResult Get()
        {
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
