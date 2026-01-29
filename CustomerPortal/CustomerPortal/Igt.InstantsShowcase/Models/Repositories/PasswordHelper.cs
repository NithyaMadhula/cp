namespace IGT.CustomerPortal.API.DAL
{
    public class PasswordHelper
    {
        const int SALT_ROUNDS = 10;

        public static string Encrypt(string input)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(SALT_ROUNDS);
            return BCrypt.Net.BCrypt.HashPassword(input, salt);
        }

        public static bool Verify(string hash, string input)
        {
            return BCrypt.Net.BCrypt.Verify(input, hash);
        }
    }
}
