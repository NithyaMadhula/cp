using System.Collections.Generic;

namespace IGT.CustomerPortal.API.DTO.Request
{
    public class ApiFunctionalityRequest
    {
        public ApiFunctionalityRequest()
        {
            Event = "init";
        }

        public string Event { get; set; }

        public IEnumerable<ApiFunctionalitySection> Sections { get; set; }
    }
}
