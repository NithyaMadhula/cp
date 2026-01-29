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
    public class LicensedPropertyController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        public async Task<IEnumerable<LicensedProperty>> Get()
        {
            var list = await new LicensedPropertyRepository(ConnectionFactory).List();
            return (list == null || !list.Any()) ? null : list;
        }

    }
}
