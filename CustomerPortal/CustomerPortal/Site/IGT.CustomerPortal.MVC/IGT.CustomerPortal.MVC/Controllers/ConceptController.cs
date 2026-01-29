using IGT.CustomerPortal.API.DTO.Response;
using IGT.CustomerPortal.MVC.Exceptions;
using IGT.CustomerPortal.MVC.Service;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace IGT.CustomerPortal.MVC.Controllers
{
    [Authorize]
    public class ConceptController : PortalControllerBase
    {
        public async Task<ActionResult> Index()
        {
            string token = AccessToken;
            IEnumerable<GameResponse> list;
            try
            {
                list = await new GameService(token).ListGames();
            }
            catch
            {
                throw new DataSourceException();
            }

            SetPageTitle("Lottery Concepts");
            ActiveMenu = "concept";

            return View(list);
        }

        public async Task<ActionResult> Detail(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return RedirectToAction("Index");
            }

            string token = AccessToken;
            GameResponse model;
            try
            {
                model = await new GameService(token).GetGame(id);
            }
            catch
            {
                throw new DataSourceException();
            }

            SetPageTitle($"Lottery Concepts;{model.Name}", ";");
            ActiveMenu = "concept";

            return View(model);
        }
    }
}