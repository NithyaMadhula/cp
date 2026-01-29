using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorizeAllButClients]
    public class PlayStyleController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        public async Task<IEnumerable<PlayStyle>> Get()
        {
            var temp = await new PlayStyleRepository(ConnectionFactory).List();
            if (temp == null) return null;
            return (temp.Any()) ? temp : null;
        }

    }
}
