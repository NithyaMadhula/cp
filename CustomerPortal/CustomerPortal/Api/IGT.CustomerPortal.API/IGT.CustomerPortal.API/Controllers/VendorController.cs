using IGT.CustomerPortal.API.DAL;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace IGT.CustomerPortal.API.Controllers
{
    [DefaultIgtAuthorize]
    public class VendorController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        public async Task<IEnumerable<Vendor>> Get()
        {
            var temp = await new VendorRepository(ConnectionFactory).List();
            if (temp == null) return null;
            return (temp.Any()) ? temp : null;
        }
    }
}
