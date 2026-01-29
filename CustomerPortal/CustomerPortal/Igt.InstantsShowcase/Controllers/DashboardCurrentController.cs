//using IGT.CustomerPortal.API.DAL;
//using IGT.CustomerPortal.API.DTO;
//using IGT.CustomerPortal.API.DTO.Request;
//using IGT.CustomerPortal.API.DTO.Response;
//using IGT.Utils.Databases;
//using System.Linq;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using System.Web.Http;
//using Thinktecture.IdentityModel.WebApi;
//using Igt.InstantsShowcase.Models;
//using System.Web.Http.Description;

//namespace Igt.InstantsShowcase.Controllers
//{
//    [ApiExplorerSettings(IgnoreApi = true)]
//    [ScopeAuthorize(new[] { "cpapi_read" })]
//    [NullFilter]
//    public class DashboardCurrentController : InstantsShowcaseControllerBase
//    {
//        public IDbConnectionFactory ConnectionFactory { get; set; }

//        /**
//         * Entry point for Dashboard Current 
//         */
//        [HttpPost]
//        public async Task<ApiFunctionalityResponse> Post([FromBody]ApiFunctionalityRequest request)
//        {
//            string username;
//            this.GetUsername(out username);

//            ApiFunctionalityRequest actualRequest = request ?? new ApiFunctionalityRequest();
//            return await EventHandler(actualRequest);
//        }

//        /**
//         * Handle all the events available for Dashboard Current
//         */
//        async Task<ApiFunctionalityResponse> EventHandler(ApiFunctionalityRequest request)
//        {
//            ApiFunctionalityResponse response = new ApiFunctionalityResponse();
//            switch (request.Event.ToLower())
//            {
//                case "init":
//                    response.Sections = await Init_Event();
//                    break;
//                case "change_client_type":
//                    var value = ApiWorkflowHelper.GetSectionValue(request, "filter_client_type");
//                    if (value == null)
//                    {
//                        ApiWorkflowHelper.AbortBadRequest();
//                    }
//                    response.Sections = await ChangeClientType_Event(int.Parse(value.ToString()));
//                    break;
//                case "process":
//                    var year = ApiWorkflowHelper.GetSectionValue(request, "filter_year");
//                    var lottery = ApiWorkflowHelper.GetSectionValue(request, "filter_lottery");

//                    if (!this.IsIGT())
//                    {
//                        string customer;
//                        this.GetCustomer(out customer);
//                        lottery = customer;
//                    }

//                    if (year == null || lottery == null)
//                    {
//                        ApiWorkflowHelper.AbortBadRequest();
//                    }

//                    response.Sections = await Process_Event(int.Parse(year.ToString()), lottery.ToString());
//                    break;
//                default:
//                    response = null;
//                    break;
//            }
//            return response;
//        }

//        async Task<IEnumerable<ApiFunctionalitySection>> Init_Event()
//        {
//            var sections = new List<ApiFunctionalitySection>();
//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "filter_year",
//                Data = new List<ApiSelectOption>
//                {
//                    new ApiSelectOption( "1", "Calendar Year", true),
//                    new ApiSelectOption( "2", "Fiscal Year", false ),
//                }
//            });

//            if (this.IsIGT())
//            {
//                sections.Add(new ApiFunctionalitySection
//                {
//                    Id = "filter_client_type",
//                    Data = new List<ApiSelectOption>
//                    {
//                        new ApiSelectOption( "1", "Domestic", true ),
//                        new ApiSelectOption( "2", "International", false ),
//                    }
//                });
//            }
//            sections.AddRange(await ChangeClientType_Event(1));

//            return sections;
//        }

//        async Task<IEnumerable<ApiFunctionalitySection>> ChangeClientType_Event(int clientType)
//        {
//            var sections = new List<ApiFunctionalitySection>();
//            IEnumerable<LotteryWithSalesInfo> lotteries;

//            if (!this.IsIGT())
//            {
//                string customer;
//                this.GetCustomer(out customer);

//                lotteries = await new IGradeRepository(ConnectionFactory).LotteryWithSalesInfo(code: customer);
//            }
//            else
//            {
//                lotteries = await new IGradeRepository(ConnectionFactory).LotteryWithSalesInfo(clientType);
//            }
            
//            if (!lotteries.Any())
//            {
//                ApiWorkflowHelper.AbortBadRequest();
//            }

//            var data = new List<ApiSelectOption>();
//            if (lotteries.Count() > 1)
//            {
//                data.Add(new ApiSelectOption("", "Select", false));
//            }
//            foreach (var lottery in lotteries)
//            {
//                data.Add(new ApiSelectOption(lottery.Code, lottery.Name, false));
//            }
//            data[0].Selected = true;

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "filter_lottery",
//                Data = data
//            });

//            return sections;
//        }

//        async Task<IEnumerable<ApiFunctionalitySection>> Process_Event(int yearType, string customerCode)
//        {
//            var repository = new IGradeRepository(ConnectionFactory);
//            LotteryTotalYTDSales sales;
//            IEnumerable<LotteryAverageSellingPrice> sellingPrices;
//            IEnumerable<LotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice> weeklySalesSnapshot;
//            IEnumerable<LotteryFYTDWeeklySalesAndPriorYearByTicketPrice> weeklySalesTicketPrice;
//            //IEnumerable<LotteryPrimaryTheme> lotteryPrimaryTheme;
//            //IEnumerable<LotteryBingoCrossword> lotteryBingoCrosswords;
//            IEnumerable<LotteryFYTDWeeklySalesAndPriorYears> lotteryFYTDWeeklySalesAndPriorYears;
//            IEnumerable<WeeklySalesAndPriorYearsByTicketPrice> weeklySalesByTicketPrice;
//            IEnumerable<LotteryTotalGameCount> lotteryTotalGameCount;
//            IEnumerable<LotteryGameCountByPrice> lotteryGameCountByPrice;
//            IEnumerable<LotteryGameCountPriorYearsByTicketPrice> lotteryGameCountPriorYearsByTicketPrice;
//            IEnumerable<ChartIndexed> chartThemeIndexed;
//            IEnumerable<ChartIndexed> chartFeatureIndexed;
//            IEnumerable<ChartIndexed> chartPlayStyleIndexed;

//            using (var conn = repository.OpenConnection())
//            {
//                var lottery = await repository.LotteryWithSalesInfo(code: customerCode, connection: conn);
//                var lotteryId = lottery.First().Id;

//                sales = await repository.LotteryTotalYTDSales(yearType, lotteryId, conn);
//                sellingPrices = await repository.LotteryAverageSellingPrice(yearType, lotteryId, conn);
//                weeklySalesSnapshot = await repository.LotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice(yearType, lotteryId, conn);
//                weeklySalesTicketPrice = await repository.LotteryFYTDWeeklySalesAndPriorYearByTicketPrice(yearType, lotteryId, conn);
//                //lotteryPrimaryTheme = await repository.LotteryPrimaryThemesLast12Months(lotteryId, conn);
//                //lotteryBingoCrosswords = await repository.LotteryBingoCrossword(yearType, lotteryId, conn);
//                //lotteryFYTDWeeklySalesAndPriorYears = await repository.LotteryFYTDWeeklySalesAndPriorYears(yearType, lotteryId, conn);
//                weeklySalesByTicketPrice = await repository.LotteryFYTDWeeklySalesAndPriorYearsByTicketPriceLineChart(yearType, lotteryId, conn);
//                lotteryTotalGameCount = await repository.LotteryTotalGameCountFYTDAndPrior5Years(yearType, lotteryId, conn);
//                lotteryGameCountByPrice = await repository.LotteryGameCountByPrice(yearType, lotteryId, conn);
//                lotteryGameCountPriorYearsByTicketPrice = await repository.LotteryGameCountPriorYearsByTicketPrice(yearType, lotteryId, conn);
//                chartThemeIndexed = await repository.ChartIndexed("theme", yearType, lotteryId, conn);
//                chartFeatureIndexed = await repository.ChartIndexed("feature", yearType, lotteryId, conn);
//                chartPlayStyleIndexed = await repository.ChartIndexed("playstyle", yearType, lotteryId, conn);
//            }

//            var sections = new List<ApiFunctionalitySection>();
//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_weekly_sales",
//                Data = sales.WeeklySales
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_ticket_breakdown",
//                Data = sales.TicketBreakdown
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_selling_price_year",
//                Data = sellingPrices
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_ytd_average_price_point_snapshot",
//                Data = weeklySalesSnapshot
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_sales_by_ticket_price",
//                Data = weeklySalesTicketPrice
//            });

//            //sections.Add(new ApiFunctionalitySection
//            //{
//            //    Id = "data_themes_prior_12_months",
//            //    Data = lotteryPrimaryTheme
//            //});

//            //sections.Add(new ApiFunctionalitySection
//            //{
//            //    Id = "data_bingo_crossword",
//            //    Data = lotteryBingoCrosswords
//            //});

//            //sections.Add(new ApiFunctionalitySection
//            //{
//            //    Id = "data_sales_current_prior_fiscal_years",
//            //    Data = lotteryFYTDWeeklySalesAndPriorYears
//            //});

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_weekly_sales_by_ticket_price",
//                Data = weeklySalesByTicketPrice
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_game_count",
//                Data = lotteryTotalGameCount
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_game_count_by_price",
//                Data = lotteryGameCountByPrice
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_game_count_prior_years_by_price",
//                Data = lotteryGameCountPriorYearsByTicketPrice
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_theme_indexed",
//                Data = chartThemeIndexed
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_feature_indexed",
//                Data = chartFeatureIndexed
//            });

//            sections.Add(new ApiFunctionalitySection
//            {
//                Id = "data_playstyle_indexed",
//                Data = chartPlayStyleIndexed
//            });

//            return sections;
//        }
//    }
//}
