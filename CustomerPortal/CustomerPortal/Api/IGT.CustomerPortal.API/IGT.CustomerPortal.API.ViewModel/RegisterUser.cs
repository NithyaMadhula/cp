namespace IGT.CustomerPortal.API.ViewModel
{
    public sealed class RegisterUserRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public sealed class RegisterUserResponse
    {
        public string Message { get; set; }
    }
}
