using IGT.CustomerPortal.API.DTO.Response;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.Client
{
    public class UserClient : ClientBase
    {
        public static async Task<AccessTokenResponse> GetAccessToken(HttpClient client, string email, string password)
        {
            var content = SetContent(new[]
            {
                        new KeyValuePair<string, string>("username", email),
                        new KeyValuePair<string, string>("password", password),
                        new KeyValuePair<string, string>("grant_type", "password")
                    });
            var message = await client.PostAsync("token", content);
            if (!CheckSuccesfulResponse(message)) return null;

            return await DeserializeResponse<AccessTokenResponse>(message);
        }

        public static async Task<UserResponse> GetUser(HttpClient client, string token)
        {
            SetAuthorizationToken(client, token);
            var message = await client.GetAsync("user");
            if (!CheckSuccesfulResponse(message)) return null;

            return await DeserializeResponse<UserResponse>(message);
        }


        //readonly Uri baseAddress;

        //public UserClient(Uri baseAddress)
        //{
        //    this.baseAddress = baseAddress;
        //}

        //public static async Task<SignInResponse> SignIn(HttpClient client, string email, string password)
        //{
        //    string token = null;
        //    UserResponse user = null;
        //    using (var client = GetClient())
        //    {
        //        //SetBaseAddress(client, baseAddress);
        //        var content = SetContent(new[]
        //        {
        //            new KeyValuePair<string, string>("username", email),
        //            new KeyValuePair<string, string>("password", password),
        //            new KeyValuePair<string, string>("grant_type", "password")
        //        });
        //        var message = await client.PostAsync("token", content);
        //        if (!CheckSuccesfulResponse(message)) return null;

        //        var credentials = await DeserializeResponse<UserCredentials>(message);
        //        token = credentials.AccessToken;

        //        SetAuthorizationToken(client, token);
        //        message = await client.GetAsync("user");
        //        if (!CheckSuccesfulResponse(message)) return null;

        //        user = await DeserializeResponse<UserResponse>(message);
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

    internal class UserCredentials
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
    }
}
