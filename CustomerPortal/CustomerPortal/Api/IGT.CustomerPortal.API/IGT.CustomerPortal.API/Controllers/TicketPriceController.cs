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
    public class TicketPriceController : ApiController
    {
        public IDbConnectionFactory ConnectionFactory { get; set; }

        [HttpGet]
        [Route("api/ticketprice/{customerCode}")]
        public async Task<IEnumerable<TicketPrice>> Get(string customerCode)
        {
            var list = await new TicketPriceRepository(ConnectionFactory).List(customerCode);
            return (list == null || !list.Any()) ? null : list;
        }

    }
}
