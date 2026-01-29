using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DTO.Request
{
    public class GameFeaturedRequest
    {
        public int? PageIndex { get; set; }
        public int? PageSize { get; set; }
    }
}
