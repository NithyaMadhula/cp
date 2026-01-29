using IGT.CustomerPortal.API.Client;
using IGT.CustomerPortal.API.DTO.Response;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.MVC.Service
{
    public sealed class GameService
    {
        readonly string token;

        public GameService(string token)
        {
            this.token = token;
        }

        public async Task<IEnumerable<GameResponse>> ListGames()
        {
            IEnumerable<GameResponse> list;
            using (var client = GameClient.GetClient(new Uri(APIHelper.Instance.GetBaseAddress())))
            {
                list = await GameClient.GetGames(client, token);
            }

            return list;
        }

        public async Task<GameResponse> GetGame(string id)
        {
            GameResponse model;
            using (var client = GameClient.GetClient(new Uri(APIHelper.Instance.GetBaseAddress())))
            {
                model = await GameClient.GetGame(client, token, id);
            }

            return model;
        }
    }
}
