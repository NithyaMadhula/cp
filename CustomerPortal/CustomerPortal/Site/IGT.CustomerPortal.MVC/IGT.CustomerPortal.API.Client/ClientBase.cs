using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.Client
{
    public abstract class ClientBase
    {
        public static HttpClient GetClient(Uri baseAddress = null)
        {
            var client = new HttpClient();
            if (baseAddress != null)
            {
                client.BaseAddress = baseAddress;
            }
            return client;
        }

        public static void SetBaseAddress(HttpClient client, Uri uri)
        {
            client.BaseAddress = uri;
        }

        public static bool CheckSuccesfulResponse(HttpResponseMessage message)
        {
            return message.IsSuccessStatusCode;
        }

        public static async Task<T> DeserializeResponse<T>(HttpResponseMessage message)
        {
            return await message.Content.ReadAsAsync<T>(new[] { new JsonMediaTypeFormatter() });
        }

        public static void SetAuthorizationToken(HttpClient client, string token)
        {
            client.DefaultRequestHeaders.Add("Authorization", $"bearer {token}");
        }

        public static FormUrlEncodedContent SetContent(IEnumerable<KeyValuePair<string, string>> nameValueCollection)
        {
            return new FormUrlEncodedContent(nameValueCollection);
        }
    }
}
