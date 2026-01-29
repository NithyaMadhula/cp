using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Igt.InstantsShowcase.Models;
using Igt.InstantsShowcase.Models.Application;
using Igt.InstantsShowcase.Models.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Igt.InstantsShowcase.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GamesController : InstantsShowcaseControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="repo"></param>
        /// <param name="userManager"></param>
        public GamesController(IHttpContextAccessor context, CustomerPortalRepository repo, UserManager<ApplicationUser> userManager) : base(context, repo, userManager)
        {

        }

        /// <summary>
        /// Returns a list of games based on a search criteria
        /// </summary>
        /// <remarks>
        /// spGame_GetDetailsByGameSearch
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<IEnumerable<GameSearchResult>> PostGameSearch([FromBody] GameSearchRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetGameSearch(req);
            return results;
        }

        /// <summary>
        /// Returns a list of games based for current customer
        /// </summary>
        /// <remarks>
        /// spGame_GetDetailsByGameSearch
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        [Route("launches")]
        public async Task<IEnumerable<GameSearchResult>> PostGameLaunchesSearch([FromBody] GameSearchRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var results = await CustomerPortal.GetGameSearch(req);
            return results.Where(x => x.SubDivisionCode == req.Customer);
        }

        /// <summary>
        /// Returns a list of favorite games for the current user
        /// </summary>
        /// <remarks>
        /// spFavorite_Get
        /// </remarks>
        /// <returns></returns>
        [HttpGet]
        [Route("favorites")]
        public async Task<IEnumerable<FavoriteGameDetails>> GetFavorites()
        {
            var user = await GetCurrentUser();
            var results = await CustomerPortal.GetFavoriteGames(user);
            return results;
        }

        /// <summary>
        /// adds favorite to current user's list
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="gameId"></param>
        /// <returns>spFavorite_Save</returns>
        [HttpGet]
        [Route("favorites/{gameId}")]
        public async Task<IEnumerable<FavoriteGameDetails>> SaveFavorite(int gameId)
        {
            var user = await GetCurrentUser();
            var wasAdded = await CustomerPortal.SaveFavorite(gameId, user);
            
            return wasAdded ? await CustomerPortal.GetFavoriteGames(user) : null;
        }

        /// <summary>
        /// Removes favorite from current user's list
        /// </summary>
        /// <param name="favoriteId"></param>
        /// <returns>spFavorite_Del</returns>
        [HttpDelete]
        [Route("favorites/{favoriteId}")]
        public async Task<bool> RemoveFavorite(int favoriteId)
        {
            var wasRemoved = await CustomerPortal.DeleteFavorite(favoriteId);
            return wasRemoved;
        }

        /// <summary>
        /// Returns a list of game search metadata
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("search-metadata")]
        public async Task<IActionResult> PostSearchMetadata(GameSearchRequest req)
        {
            req.Customer = await GetCustomerCode(req.Customer);
            var value = await this.PostGameSearch(req);

            return Ok(new
            {
                theme = new List<KeyValue> {
new KeyValue("1496", "Numbers"),
new KeyValue("1497","Merchandise Other"),
new KeyValue("1498","Extended Play - Other"),
//new KeyValue("1499","Money/ Novelty"),
new KeyValue("1500","Treasure"),
new KeyValue("1501","Holiday"),
new KeyValue("1502","Precious Metals"),
new KeyValue("1503","Games(nonLottery)"),
new KeyValue("1504","Celebrity"),
//new KeyValue("1505","Money"),
new KeyValue("1506","Casino"),
new KeyValue("1507","Slots"),
//new KeyValue("1508","Charity"),
new KeyValue("1509","None"),
//new KeyValue("1510","Novelty/  Money"),
//new KeyValue("1511","Novelty/Seasonal"),
new KeyValue("1512","Dice"),
new KeyValue("1513","Food"),
new KeyValue("1514","TV / Movie"),
new KeyValue("1515","Roulette"),
new KeyValue("1516","Adventure"),
new KeyValue("1517","Gems"),
new KeyValue("1518","Whimsical"),
new KeyValue("1519","Crossword"),
new KeyValue("1520","Anniversary"),
new KeyValue("1521","Tic - Tac - Toe"),
new KeyValue("1522","Cards"),
new KeyValue("1523","Luck"),
new KeyValue("1524","Merchandise Vehicle"),
new KeyValue("1525","Money / Cash"),
new KeyValue("1526","Novelty"),
//new KeyValue("1527","Extended"),
//new KeyValue("1528","Multiplier - Doubler"),
new KeyValue("1529","Seasonal"),
new KeyValue("1530","Travel"),
new KeyValue("1531","State Pride"),
//new KeyValue("1532","Multiplier - Other"),
//new KeyValue("1533","Seasonal/ Money"),
new KeyValue("1534","Sports"),
//new KeyValue("1535","Beat Dealer"),
new KeyValue("1536","Music"),
new KeyValue("1537","Bingo"),
new KeyValue("1538","Other"),
new KeyValue("1539","Annuity / For Life"),
new KeyValue("1540","Slingo"),
new KeyValue("1541","Lottery Draw"),
new KeyValue("1542","Special Causes"),
new KeyValue("1543","Multiplier"),
new KeyValue("1544","Pig"),
new KeyValue("1545","Pig(Intl)"),
new KeyValue("1546","Keno"),
//new KeyValue("1547","Roulette"),
new KeyValue("1548","Color"),
new KeyValue("1549","Unknown"),
new KeyValue("1550","Loteria"),
new KeyValue("1551","Annuity Prize <20YR")
                }.OrderBy(x => x.Value),
                color = new List<KeyValue> {
new KeyValue("1385","Silver"),
new KeyValue("1386","Green"),
new KeyValue("1387","Burgundy"),
new KeyValue("1388","Purple"),
new KeyValue("1389","Gray"),
new KeyValue("1391","Pink"),
new KeyValue("1392","Red"),
new KeyValue("1393","Bronze"),
new KeyValue("1394","Navy"),
new KeyValue("1395","Brown"),
new KeyValue("1396","Maroon"),
new KeyValue("1397","Multi - Color"),
new KeyValue("1398","Gold"),
new KeyValue("1399","Beige"),
new KeyValue("1400","Black"),
new KeyValue("1401","Lavender"),
new KeyValue("1402","Aqua"),
new KeyValue("1403","Fuchsia"),
new KeyValue("1404","Magenta"),
new KeyValue("1405","Yellow"),
new KeyValue("1406","Teal"),
new KeyValue("1407","White"),
new KeyValue("1408","Orange"),
new KeyValue("1409","Blue"),
new KeyValue("1410","Other"),
new KeyValue("1411","Cyan"),
new KeyValue("1412","Tan"),
new KeyValue("1414","Platinum"),
new KeyValue("1415","Violet"),
new KeyValue("1417","Scene"),   }.OrderBy(x => x.Value),
                feature = new List<KeyValue> {
new KeyValue("9523","Multiplier - 10 x"),
new KeyValue("9524","Multiplier - Tripler"),
new KeyValue("9525","None"),
new KeyValue("9526","Multiplier - 5x"),
new KeyValue("9527","Autowin - Single"),
new KeyValue("9528","Multiplier - Doubler"),
new KeyValue("9529","Multiplier - Other"),
new KeyValue("9531","Autowin - All"),
new KeyValue("9532","Second Chance Draw"),
new KeyValue("9533","Gamebook"),
new KeyValue("9534","Multiplier - 20 x"),
new KeyValue("9535","Crossover"),
new KeyValue("9536","Ticket Back Play"),
new KeyValue("9537","Bonus / Extra Play"),
new KeyValue("9538","Multiplier - > 20 x")}.OrderBy(x => x.Value),
                paperStockCategory = new List<KeyValue> { new KeyValue("1000","Board"),
new KeyValue("1100","Foil"),
new KeyValue("1200","Holographic")}.OrderBy(x => x.Value),
                playStyle = new List<KeyValue> {
                    new KeyValue("1978", "Extended Play - other"),
                            new KeyValue("1979","Add Up"),
                            new KeyValue("1980","Match 3"),
                            new KeyValue("1981","Odds / Evens"),
                            new KeyValue("1982","None"),
                            new KeyValue("1983","Key Symbol Match"),
                            new KeyValue("1984","Blackjack"),
                            new KeyValue("1985","Roulette"),
                            new KeyValue("1986","Crossword"),
                            new KeyValue("1987","Find Symbol"),
                            new KeyValue("1988","Poker"),
                            new KeyValue("1989","Tic Tac Toe"),
                            new KeyValue("1990","Multiple"),
                            new KeyValue("1991","Bingo"),
                            new KeyValue("1992","Key Number Match"),
                            new KeyValue("1993","Match 2"),
                            new KeyValue("1994","Other"),
                            new KeyValue("1995","Slingo"),
                            new KeyValue("1996","Slot Machine"),
                            new KeyValue("1997","Key Beat"),
                            new KeyValue("1998","Loteria"),
                            new KeyValue("1999","Pull - Tab"),
                            new KeyValue("2000","Keno") }.OrderBy(x => x.Value),

                ticketPrice = new List<KeyValue> { new KeyValue("$1.00", "1.00")
                                                    , new KeyValue("$2.00","2.00"  )
                                                    , new KeyValue("$3.00","3.00"  )
                                                    , new KeyValue("$5.00","5.00"  )
                                                    , new KeyValue("$10.00","10.00")
                                                    , new KeyValue("$15.00","15.00")
                                                    , new KeyValue("$20.00","20.00")
                                                    , new KeyValue("$25.00","25.00")
                                                    , new KeyValue("$30.00","30.00")
                                                    , new KeyValue("$50.00","50.00")
            }.OrderBy(x => Convert.ToDecimal(x.Value)),
                specialtyOption = new List<KeyValue> {
                                                     //new KeyValue("1","4 Color process on Ticket Back"    )
                                                    //, new KeyValue("2","Color Bleed"                       )
                                                    //, new KeyValue("3","Color Fusion"                      )
                                                     new KeyValue("4","Color Pulsing"                     )
                                                    //, new KeyValue("5","Custom Fonts"                      )
                                                    , new KeyValue("6","Die Cut"                           )
                                                    //, new KeyValue("7","Dual Color Imaging"                )
                                                    //, new KeyValue("8","Fluorescent Benday"                )
                                                    //, new KeyValue("9","Fluorescent Inks"                  )
                                                    //, new KeyValue("10","Glitter ( Glitz and Glam)"        )
                                                    //, new KeyValue("11","Metallic"                         )
                                                    //, new KeyValue("12","Microbranding / Lettering"        )
                                                    , new KeyValue("13","Multi Color Imaging"              )
                                                    , new KeyValue("14","Multiple Scenes"                  )
                                                    //, new KeyValue("15","Player's Mark"                    )
                                                    //, new KeyValue("16","Pro Fusion"                       )
                                                    , new KeyValue("17","Pulse Scene"                      )
                                                    //, new KeyValue("18","QR Code Reader and/ or 2nd Chance")
                                                    //, new KeyValue("19","Raised UV"                        )
                                                    , new KeyValue("20","Scented Game"                     )
                                                    //, new KeyValue("21","Translucent"                      )
                                                    , new KeyValue("22","Glitter (Glitz)"                      )
                                                    , new KeyValue("23","Color Fusion / Faux Foil (Glam)"                      )
                                                    , new KeyValue("24","HD / Hi Res"                      )
                                                    , new KeyValue("25","Color Reveal"                      )
                                                    , new KeyValue("26","Ticket Back Play"                      )
                                                    , new KeyValue("27","None"                      )
                                                    , new KeyValue("28","Gleam"                      )
                                                    , new KeyValue("29","Infinity"                      )
                                                    , new KeyValue("30","Oversized Ticket"                      )
            }.OrderBy(x => x.Value),
                jurisdiction = new List<KeyValue>
            {

new KeyValue("3","Arizona Lottery")
,new KeyValue("5","California Lottery")
,new KeyValue("6","Colorado Lottery")
,new KeyValue("7","Connecticut Lottery Corp")
,new KeyValue("9","Florida Lottery")
,new KeyValue("10","Georgia Lottery")
,new KeyValue("12","Idaho Lottery")
,new KeyValue("14","Indiana/Hoosier Lottery")
,new KeyValue("15","Iowa Lottery")
,new KeyValue("16","Kansas Lottery")
//,new KeyValue("17","Kentucky Lottery")
,new KeyValue("20","Maryland State Lottery")
,new KeyValue("21","Massachusetts Lottery")
,new KeyValue("22","Michigan Lottery")
,new KeyValue("23","Minnesota State Lottery")
,new KeyValue("24","Mississippi Lottery")
,new KeyValue("25","Missouri Lottery")
,new KeyValue("27","Nebraska Lottery")
,new KeyValue("29","New Hampshire")
,new KeyValue("30","New Jersey Lottery")
,new KeyValue("31","New Mexico Lottery")
,new KeyValue("32","New York Lottery")
,new KeyValue("33","North Carolina Education Lottery")
,new KeyValue("35","Ohio Lottery")
,new KeyValue("37","Oregon State Lottery")
,new KeyValue("39","Rhode Island Lottery")
,new KeyValue("43","Texas Lottery Commission")
,new KeyValue("46","Virginia Lottery")
,new KeyValue("47","Washington's  Lottery")
,new KeyValue("48","West Virginia Lottery")
,new KeyValue("49","Wisconsin Lottery")
,new KeyValue("50","DC Lottery")

            }.OrderBy(x => x.Value)
            });
        }
    }
}
