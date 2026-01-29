using IGT.CustomerPortal.API.Client;
using IGT.CustomerPortal.API.DTO.Response;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.MVC.Service
{
    public sealed class FavoriteService
    {
        readonly string token;

        public FavoriteService(string token)
        {
            this.token = token;
        }

        public async Task<IEnumerable<GameResponse>> List()
        {
            IEnumerable<GameResponse> list;
            using (var client = FavoriteClient.GetClient(new Uri(APIHelper.Instance.GetBaseAddress())))
            {
                list = await FavoriteClient.List(client, token);
            }

            return list;
        }

        public async Task<bool> Add(string id)
        {
            bool ok = false;
            using (var client = FavoriteClient.GetClient(new Uri(APIHelper.Instance.GetBaseAddress())))
            {
                var response = await FavoriteClient.Add(client, token, id);
                ok = response.Successful;
            }
            return ok;
        }

        public async Task<bool> Delete(string id)
        {
            bool ok = false;
            using (var client = FavoriteClient.GetClient(new Uri(APIHelper.Instance.GetBaseAddress())))
            {
                var response = await FavoriteClient.Delete(client, token, id);
                ok = response.Successful;
            }
            return ok;
        }
    }
}
