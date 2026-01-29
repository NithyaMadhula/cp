using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace IGT.CustomerPortal.API.Controllers
{
    [Route("api/test")]
    public class TestController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }
        // GET: api/Test
       
        public async Task<IEnumerable<DetailedGameSearch>> Get()
        {            
            //Matches default request from DetailedGameSearch Controller
            var list = await new DetailedGameSearchRepository(ConnectionFactory).List("VA", "");

            if (list == null || !list.Any()) return null;
            //DetailedGameSearch.ConceptsUrl = this.GetFullConceptsUri();
            return list;
        }

        // GET: api/Test/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Test
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Test/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Test/5
        public void Delete(int id)
        {
        }
    }
}
