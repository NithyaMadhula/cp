using IGT.CustomerPortal.API.Client;
using IGT.CustomerPortal.API.DTO.Response;
using System;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.MVC.Service
{
    public sealed class UserService
    {
        public UserService()
        {

        }

        public async Task<SignInResponse> SignIn(string email, string password)
        {
            AccessTokenResponse tokenResponse;
            UserResponse userResponse = null;
            using (var client = UserClient.GetClient(new Uri(APIHelper.Instance.GetBaseAddress())))
            {
                tokenResponse = await UserClient.GetAccessToken(client, email, password);
                if (tokenResponse != null)
                {
                    userResponse = await UserClient.GetUser(client, tokenResponse.AccessToken);
                }
            }

            return new SignInResponse
            {
                Name = userResponse?.Name,
                Token = tokenResponse?.AccessToken
            };
        }


        //public static async Task<SignInResponse> SignIn(string email, string password)
        //{
        //    string token = null;
        //    UserResponse user = null;
        //    using (var client = new HttpClient())
        //    {
        //        client.BaseAddress = new Uri(APIHelper.Instance.GetBaseAddress());
        //        var content = new FormUrlEncodedContent(new[]
        //        {
        //            new KeyValuePair<string, string>("username", email),
        //            new KeyValuePair<string, string>("password", password),
        //            new KeyValuePair<string, string>("grant_type", "password")
        //        });
        //        var result = await client.PostAsync("token", content);
        //        if (!result.IsSuccessStatusCode) return null;

        //        var credentials = await result.Content.ReadAsAsync<UserCredentials>(new[] { new JsonMediaTypeFormatter() });
        //        token = credentials.AccessToken;

        //        client.DefaultRequestHeaders.Add("Authorization", $"bearer {token}");
        //        result = await client.GetAsync("user");
        //        if (!result.IsSuccessStatusCode) return null;

        //        user = await result.Content.ReadAsAsync<UserResponse>(new[] { new JsonMediaTypeFormatter() });
        //    }
        //    return new SignInResponse
        //    {
        //        Token = token,
        //        Name = user.Name
        //    };
        //}
    }

    public class SignInResponse
    {
        public string Token { get; set; }
        public string Name { get; set; }
    }

    //internal class UserResponse
    //{
    //    public string Name { get; set; }
    //    public string Email { get; set; }
    //}

    //internal class UserCredentials
    //{
    //    [JsonProperty("access_token")]
    //    public string AccessToken { get; set; }

    //    [JsonProperty("token_type")]
    //    public string TokenType { get; set; }

    //    [JsonProperty("expires_in")]
    //    public int ExpiresIn { get; set; }
    //}
}
