using IGT.CustomerPortal.API.DTO.Request;
using IGT.CustomerPortal.API.DTO.Response;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.Client
{
    public class FavoriteClient : ClientBase
    {
        public static async Task<IEnumerable<GameResponse>> List(HttpClient client, string token)
        {
            SetAuthorizationToken(client, token);
            var message = await client.GetAsync("favorite");
            if (!CheckSuccesfulResponse(message)) throw new InvalidOperationException();

            return await DeserializeResponse<IEnumerable<GameResponse>>(message);
        }

        public static async Task<GenericResponse> Add(HttpClient client, string token, string id)
        {
            SetAuthorizationToken(client, token);
            var model = new GameRequest
            {
                Id = int.Parse(id)
            };
            var message = await client.PostAsJsonAsync("favorite", model);
            if (!CheckSuccesfulResponse(message)) throw new InvalidOperationException();

            return await DeserializeResponse<GenericResponse>(message);
        }

        public static async Task<GenericResponse> Delete(HttpClient client, string token, string id)
        {
            SetAuthorizationToken(client, token);
            var message = await client.DeleteAsync($"favorite/{id}");
            if (!CheckSuccesfulResponse(message)) throw new InvalidOperationException();

            return await DeserializeResponse<GenericResponse>(message);
        }
    }
}
