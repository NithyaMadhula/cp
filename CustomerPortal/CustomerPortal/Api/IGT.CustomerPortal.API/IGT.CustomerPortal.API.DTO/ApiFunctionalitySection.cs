namespace IGT.CustomerPortal.API.DTO
{
    public class ApiFunctionalitySection
    {
        public string Id { get; set; }

        public bool HasError { get; set; }

        public string ErrorMessage { get; set; }

        public object Data { get; set; }
    }
}
