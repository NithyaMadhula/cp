using IGT.CustomerPortal.API.DTO.Request;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace IGT.CustomerPortal.API
{
    public class ApiWorkflowHelper
    {
        public static object GetSectionValue(ApiFunctionalityRequest request, string sectionId)
        {
            var section = request.Sections.FirstOrDefault(s => s.Id.ToLower().Equals(sectionId));
            if (section == null) return null;
            return section.Data;
        }

        public static void AbortBadRequest(string message = null)
        {
            // TODO: handle message
            throw new HttpResponseException(HttpStatusCode.BadRequest);
        }
    }
}