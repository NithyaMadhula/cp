using IGT.CustomerPortal.API.DTO.Response;
using IGT.CustomerPortal.MVC.Exceptions;
using IGT.CustomerPortal.MVC.Models;
using IGT.CustomerPortal.MVC.Service;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace IGT.CustomerPortal.MVC.Controllers
{
    [Authorize]
    public class FavoriteController : PortalControllerBase
    {
        // GET: Favorite
        public async Task<ActionResult> Index()
        {
            string token = AccessToken;
            IEnumerable<GameResponse> list;
            try
            {
                list = await new FavoriteService(token).List();
            }
            catch
            {
                throw new DataSourceException();
            }

            SetPageTitle("Favorites");
            ActiveMenu = "favorite";

            return View(list);
        }

        [HttpPost]
        public async Task<ActionResult> Toggle(IdRequestViewModel model)
        {
            if (string.IsNullOrEmpty(model?.Id))
            {
                return new EmptyResult();
            }

            string token = AccessToken;
            GameResponse response;
            try
            {
                response = await new GameService(token).GetGame(model.Id);
                if (!response.IsInFavorites)
                {
                    await new FavoriteService(token).Add(model.Id);
                }
                else
                {
                    await new FavoriteService(token).Delete(model.Id);
                }
                response = await new GameService(token).GetGame(model.Id);
            }
            catch
            {
                throw new DataSourceException();
            }

            return View(response);
        }

    }
}