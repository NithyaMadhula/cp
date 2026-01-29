using IGT.CustomerPortal.API.DTO.Response;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.Client
{
    public class GameClient : ClientBase
    {
        public static async Task<IEnumerable<GameResponse>> GetGames(HttpClient client, string token)
        {
            SetAuthorizationToken(client, token);
            var message = await client.GetAsync("game");
            if (!CheckSuccesfulResponse(message)) throw new InvalidOperationException();

            return await DeserializeResponse<IEnumerable<GameResponse>>(message);
        }

        public static async Task<GameResponse> GetGame(HttpClient client, string token, string id)
        {
            SetAuthorizationToken(client, token);
            var message = await client.GetAsync($"game/{id}");
            if (!CheckSuccesfulResponse(message)) throw new InvalidOperationException();

            return await DeserializeResponse<GameResponse>(message);
        }
    }
}
