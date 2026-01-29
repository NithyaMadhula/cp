using System.Collections.Generic;

namespace IGT.CustomerPortal.API.DTO.Response
{
    public class ApiFunctionalityResponse
    {
        public IEnumerable<ApiFunctionalitySection> Sections { get; set; }
    }

    public class ApiSelectOption
    {
        public ApiSelectOption()
        {
                
        }

        public ApiSelectOption(string id, string description, bool selected)
        {
            Id = id?.Trim();
            Description = description?.Trim();
            Selected = selected;
        }

        public string Id { get; set; }
        public string Description { get; set; }
        public bool Selected { get; set; }
    }
}
