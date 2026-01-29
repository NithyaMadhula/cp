using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.DTO.Response;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class PrizeStructureProfileController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        [Route("api/prize-structure-profile")]
        [HttpPost]
        public async Task<IHttpActionResult> GenerateProfile([FromBody]PrizeStructureProfileRequest request)
        {
            string customer = null;
            if (!this.IsIGT())
            {
                this.GetCustomer(out customer);
                request.CustomerCode = customer;
            }

            return Ok(await new PrizeStructureProfileRepository(ConnectionFactory).Get(request));
        }        
    }
}
