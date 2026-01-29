using System;
using System.Security.Cryptography;
using System.Text;

namespace IGT.Oauth.Utils
{
    public class HashHelper
    {
        const int BCRYPT_SALT_ROUNDS = 12;

        public static string Sha512(string input)
        {

            using (var sha = SHA512.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(input);
                var hash = sha.ComputeHash(bytes);

                return Convert.ToBase64String(hash);
            }
        }

        public static string BCryptEncrypt(string input)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(BCRYPT_SALT_ROUNDS);
            return BCrypt.Net.BCrypt.HashPassword(input, salt);
        }

        public static bool BCryptVerify(string hash, string input)
        {
            return BCrypt.Net.BCrypt.Verify(input, hash);
        }
    }
}