using Dapper;
using Igt.InstantsShowcase.Models.Application;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Igt.InstantsShowcase.Models.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    public class CustomerPortalRepository : BaseRepository
    {
        const int VENDOR_TYPE_ALL = 0;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="config"></param>
        public CustomerPortalRepository(IDbConfig config) : base(config) { }


        #region spLottery
        /// <summary>
        /// calls spLottery_GetCustomerList
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Customer>> Lotteries(int isInternational)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetCustomerList",
                    param: new { isInternational },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<Customer>();
            });
        }

        /// <summary>
        /// calls spLottery_GetCustomerWithSales
        /// </summary>
        /// <param name="isInternational"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Customer>> LotteriesWithSales(int isInternational)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetCustomerWithSales",
                    param: new { isInternational },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<Customer>();
            });
        }

        /// <summary>
        /// calls spLottery_GetCustomerWithPenetration
        /// </summary>
        /// <param name="isInternational"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Customer>> LotteriesWithPenetration(int isInternational)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetCustomerWithPenetration",
                    param: new { isInternational },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<Customer>();
            });
        }

        /// <summary>
        /// calls spLottery_GetTicketPrice
        /// </summary>
        /// <param name="customerCode"></param>
        /// <returns></returns>
        public async Task<IEnumerable<TicketPrice>> GetTicketPrices(string customerCode)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetTicketPrice",
                    param: new { CustomerCodes = customerCode },
                    commandType: CommandType.StoredProcedure);

                var data = await dr.ReadAsync<dynamic>();
                return data.Select(x => new TicketPrice { Value = x.TicketPrice });
            });
        }

        /// <summary>
        /// calls spLottery_GetSalesByYear
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<NaloLotterySales>> GetNaloLotterySales(NaloLotterySalesRequest req)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryAsync(
                    sql: "spLottery_GetSalesByYear",
                    param: new
                    {
                        CustomerCode = "IGT",//req.Customer,
                        StartDate = req.Startdate
                    },
                    commandType: CommandType.StoredProcedure);

                var result = new List<NaloLotterySales>();

                foreach (var row in dr)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new NaloLotterySales
                    {
                        LotteryId = GetValue<int>(properties, "LotteryID"),
                        BusinessName = GetValue<string>(properties, "BusinessName"),
                        RevenueYTDCurrent = GetValue<decimal>(properties, "Revenue YTD Curr"),
                        RevenueYTDPrior = GetValue<decimal>(properties, "Revenue YTD Prior"),
                        PercentChange = GetValue<decimal>(properties, "% Change"),
                        MaxSalesDate = GetValue<DateTime>(properties, "MaxSalesDate"),
                    });
                }

                return result;
            });
        }

        /// <summary>
        /// calls spLottery_GetSalesAverageByTicketPrice
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<FytdWeeklySalesSnapshot>> GetFytdWeeklySalesSnapshot(DashboardCurrentRequest req)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryAsync(
                    sql: "spLottery_GetSalesAverageByTicketPrice",
                    param: new
                    { CustomerCode = req.Customer, isFiscalYear = req.YearType },
                    commandType: CommandType.StoredProcedure);

                var result = new List<FytdWeeklySalesSnapshot>();

                foreach (var row in dr)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new FytdWeeklySalesSnapshot
                    {
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        CurrentYear = GetValue<int>(properties, "Current Year"),
                        CurrentWeekSales = GetValue<decimal>(properties, "Current Week Sales"),
                        PriorYear = GetValue<int>(properties, "Prior Year"),
                        PriorWeekSales = GetValue<decimal>(properties, "Prior Week Sales"),
                    });
                }

                return result;
            });
        }

        /// <summary>
        /// calls spLottery_GetTotalYTDSales
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<WeeklySales> GetInstantWeeklySales(DashboardCurrentRequest req)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryAsync(
                    sql: "spLottery_GetTotalYTDSales",
                    param: new
                    { CustomerCode = req.Customer, isFiscalYear = req?.YearType ?? 1 },
                    commandType: CommandType.StoredProcedure);

                var result = new List<WeeklySales>();

                foreach (var row in dr)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new WeeklySales
                    {
                        CurrWeek = GetValue<DateTime>(properties, "Curr Week"),
                        CurrWeekSales = GetValue<decimal>(properties, "Curr Week Sales"),
                        YTDSales = GetValue<decimal>(properties, "YTD Sales"),
                        PriorYearWeek = GetValue<DateTime>(properties, "Prior Year Week"),
                        PriorYearWeekSales = GetValue<decimal>(properties, "Prior Year Week Sales"),
                        PriorYearYTDSales = GetValue<decimal>(properties, "Prior Year YTD Sales"),
                        WeekDifference = GetValue<decimal>(properties, "Week Difference"),
                        PercentChangeWeek = GetValue<string>(properties, "as '% Change Week") ?? "N/A",
                        YTDDifference = GetValue<decimal>(properties, "YTD Difference"),
                        PercentChangeYear = GetValue<string>(properties, "% Change Year"),
                        Weeks = GetValue<int>(properties, "Weeks"),
                        CurrentYear = GetValue<string>(properties, "Current Year"),
                        StartMonthDay = GetValue<string>(properties, "Start Month Day"),
                        SalesType = GetValue<string>(properties, "Sales Type")
                    });
                }

                return result.FirstOrDefault();
            });
        }

        /// <summary>
        /// calls spLottery_GetTotalSalesByWeekAndTicketPrice
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<WeeklySalesYearTicketPrice>> GetWeeklySalesYearTicketPrice(DashboardCurrentRequest req)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetTotalSalesByWeekAndTicketPrice",
                    param: new { CustomerCode = req.Customer, isFiscalYear = req.YearType, req.TicketPrice },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<WeeklySalesYearTicketPrice>();
            });
        }

        /// <summary>
        /// calls spLottery_GetTotalSalesByWeek
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<LotteryFytdWeeklySalesAndPriorYears>> GetLotteryFytdWeeklySalesAndPriorYears(DashboardCurrentRequest req)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryAsync(
                    sql: "spLottery_GetTotalSalesByWeek",
                    param: new { CustomerCode = req.Customer, isFiscalYear = req.YearType },
                    commandType: CommandType.StoredProcedure);

                var result = new List<LotteryFytdWeeklySalesAndPriorYears>();

                foreach (var row in dr)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new LotteryFytdWeeklySalesAndPriorYears
                    {
                        WeekEndDate = GetValue<DateTime>(properties, "WeekEndDate"),
                        WeekSales = GetValue<decimal>(properties, "WeekSales"),
                        Year = GetValue<int>(properties, "Year"),
                        Month = GetValue<string>(properties, "Month")
                    });
                }

                return result;
            });
        }

        /// <summary>
        /// calls spLottery_GetIndexBasicSearch
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<CustomIndexBasic>> GetBasicIndex(CustomIndexBasicRequest req)
        {

            #region sqlmapper 
            var columnMaps = new Dictionary<string, string>
            {
                { "Average Sales", "AverageSales" },
                { "Standard Index", "StandardIndex" },
                { "AverageRateOfSales", "AverageRoS" },
                { "RoSIndex", "RosIndex" },
                { "ActivePen", "ActivePenetration" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var customIndexBasicMap = new CustomPropertyTypeMap(
                typeof(CustomIndexBasic),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(CustomIndexBasic), customIndexBasicMap);
            #endregion

            return await WithConnection(async c =>
            {
                req.EndDate = req.EndDate == DateTime.MinValue ? DateTime.Now : req.EndDate;
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetIndexBasicSearch",
                    param: new
                    {
                        CustomerCode = req.Customer,
                        req.TicketPrice,
                        req.StartDate,
                        req.EndDate,
                        req.IndexWeek
                    },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<CustomIndexBasic>();
            });
        }

        /// <summary>
        /// calls spLottery_GetTicketSales
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<TicketBreakdown>> GetTicketBreakdown(DashboardCurrentRequest req)
        {
            #region sqlmapper
            var columnMaps = new Dictionary<string, string>
            {
                { "Ticket Price",          "TicketPrice" },
                { "Curr Week Sales",       "CurrWeekSales" },
                { "YTD Sales",             "YTDSales" },
                { "% Sales YTD",           "PercentSalesYTD" },
                { "Prior Week Sales",  "PriorYearWeekSales" },
                { "Prior Year YTD Sales",  "PriorYearYTDSales" },
                { "% Sales Prior YTD",     "PercentSalesPriorYTD" },
                { "Week Difference",       "WeekDifference" },
                { "% Change Week",         "PercentChangeWeek" },
                { "YTD Difference",        "YTDDifference" },
                { "% Change Year",         "PercentChangeYear" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var ticketBreakdownMap = new CustomPropertyTypeMap(
                typeof(TicketBreakdown),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(TicketBreakdown), ticketBreakdownMap);
            #endregion

            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetTicketSales",
                    param: new { CustomerCode = req.Customer, isFiscalYear = req.YearType ?? 0 },
                    commandType: CommandType.StoredProcedure);

                var results = await dr.ReadAsync<TicketBreakdown>();

                foreach (var bd in results)
                {
                    bd.PercentChangeWeek = bd.PercentChangeWeek ?? "N/A";
                }

                return results;
            });
        }

        /// <summary>
        /// calls spLottery_GetTotalYTDSales
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<NaloYtdSales>> GetNaloYtdSales(NaloYtdSalesRequest req)
        {
            #region sqlmapper
            var rateOfSalesColumnMaps = new Dictionary<string, string>
            {
                { "Curr Week","CurrWeek" },
                { "Curr Week Sales","CurrWeekSales" },
                { "YTD Sales","YTDSales" },
                { "Prior Year Week","PriorYearWeek" },
                { "Prior Year Week Sales", "PriorYearWeekSale" },
                { "Prior Year YTD Sales","PriorYearYTDSales" },
                { "Week Difference","WeekDifference" },
                { "as '% Change Week","PercentChangeWeek" },
                { "YTD Difference","YTDDifference" },
                { "% Change Year","PercentChangeYear" },
                { "Current Year","CurrentYear" },
                { "Start Month Day","StartMonthDay" },
                { "Sales Type","SalesType" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (rateOfSalesColumnMaps.ContainsKey(columnName))
                    return type.GetProperty(rateOfSalesColumnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var rateOfSalesMap = new CustomPropertyTypeMap(
                typeof(NaloYtdSales),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(NaloYtdSales), rateOfSalesMap);
            #endregion

            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spLottery_GetTotalYTDSales",
                    param: new
                    {
                        CustomerCode = req.Customer,
                        IsFiscalYear = 0
                    },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<NaloYtdSales>();
            });
        }



        public async Task<object> GetPrizeStructureProfile(PrizeStructureProfileRequest req)
        {
            return await WithConnection(async c =>
            {

                var results = new Dictionary<string, object>();
                var customerOnly = new
                {
                    req.CustomerCode,
                    req.TicketPrice,
                    req.StartDate,
                    req.EndDate
                };

                var customerExclusion = new
                {
                    req.CustomerCode,
                    req.TicketPrice,
                    req.StartDate,
                    req.EndDate,
                    req.ExcludeGameID
                };

                string sql = "spLottery_GetPrizeStructureClassficationByCustomer";
                results.Add("ClassficationByCustomer", (await c.QueryAsync(
                        sql,
                        customerOnly,
                        commandType: CommandType.StoredProcedure)).AsList());

                sql = "spLottery_GetPrizeStructurePercentByExclusion";
                results.Add("PercentByExclusion", (await c.QueryAsync(
                        sql,
                        customerExclusion,
                        commandType: CommandType.StoredProcedure)).AsList());

                sql = "spLottery_GetPrizeStructurePercentTotalByExclusion";
                results.Add("PercentTotalByExclusion", (await c.QueryAsync(
                        sql,
                        customerExclusion,
                        commandType: CommandType.StoredProcedure)).AsList());

                sql = "spLottery_GetPrizeStructureTopPrizeByExclusion";
                results.Add("TopPrizeByExclusion", (await c.QueryAsync(
                        sql,
                        customerExclusion,
                        commandType: CommandType.StoredProcedure)).AsList());

                sql = "spLottery_GetPrizeStructureGameNameByCustomer";
                results.Add("Games", (await c.QueryAsync(
                        sql,
                        customerOnly,
                        commandType: CommandType.StoredProcedure)).AsList());

                sql = "spLottery_GetPrizeStructurePercentByCustomer";
                results.Add("PercentByCustomer", (await c.QueryAsync(
                        sql,
                        customerOnly,
                        commandType: CommandType.StoredProcedure)).AsList());

                sql = "spLottery_GetPrizeStructurePercentTotalByCustomer";
                results.Add("PercentTotalByCustomer", (await c.QueryAsync(
                        sql,
                        customerOnly,
                        commandType: CommandType.StoredProcedure)).AsList());

                sql = "spLottery_GetPrizeStructureTopPrizeByCustomer";
                results.Add("TopPrizeByCustomer", (await c.QueryAsync(
                        sql,
                        customerOnly,
                        commandType: CommandType.StoredProcedure)).AsList());

                if (!String.IsNullOrWhiteSpace(req.CustomerCodes))
                {
                    var customers = new
                    {
                        req.CustomerCodes,
                        req.TicketPrice,
                        req.StartDate,
                        req.EndDate,
                        req.ExcludeGameID
                    };

                    sql = "spLottery_GetPrizeStructureClassificationByComparison";
                    results.Add("ClassficationByComparison", (await c.QueryAsync(
                            sql,
                            customers,
                            commandType: CommandType.StoredProcedure)).AsList());

                    sql = "spLottery_GetPrizeStructurePercentTotalByComparison";
                    results.Add("PercentTotalByComparison", (await c.QueryAsync(
                            sql,
                            customers,
                            commandType: CommandType.StoredProcedure)).AsList());

                    sql = "spLottery_GetPrizeStructureTopPrizeByComparison";
                    results.Add("TopPrizeByComparison", (await c.QueryAsync(
                            sql,
                            customers,
                            commandType: CommandType.StoredProcedure)).AsList());
                }


                return results;
            });
        }
        #endregion

        #region spGame
        /// <summary>
        /// calls spGame_GetActiveSalesThru
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        public async Task<IEnumerable<ReportActive>> GetActiveSalesReport(string customer)
        {
            return await WithConnection(async c =>
            {
                var data = await c.QueryAsync(
                        "spGame_GetActiveSalesThru",
                        new { CustomerCode = customer, VendorType = VENDOR_TYPE_ALL },
                        commandType: CommandType.StoredProcedure);

                var result = new List<ReportActive>();
                foreach (var row in data)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new ReportActive
                    {
                        GameID = GetValue<int>(properties, "GameID"),
                        GameReference = GetValue<string>(properties, "GameReference"),
                        GameName = GetValue<string>(properties, "GameName"),
                        StartDate = GetValue<DateTime>(properties, "StartDate"),
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        TicketsOrdered = GetValue<int>(properties, "TicketsOrdered"),
                        TicketsReceived = GetValue<int>(properties, "TicketsReceived"),
                        NumberWeeksOnSale = GetValue<int>(properties, "# Weeks On Sale"),
                        WeekEndDate = GetValue<DateTime>(properties, "WeekEndDate"),
                        CurrWeekSales = GetValue<decimal>(properties, "Curr Week Sales"),
                        TicketQtyReceived = GetValue<int>(properties, "Ticket Qty Received"),
                        TicketQtyRemaining = GetValue<decimal>(properties, "Ticket Qty Remaining"),
                        SalesToDate = GetValue<decimal>(properties, "Sales To-Date"),
                        AverageSales = GetValue<decimal>(properties, "Average Sales"),
                        SellThru = GetValue<decimal>(properties, "Sell-Thru"),
                        WeeksRemaining = GetValue<decimal>(properties, "WeeksRemaining"),
                        Week13Average = GetValue<decimal>(properties, "13 Week Average"),
                        Week13SellThru = GetValue<string>(properties, "13 Week Sell-Thru"),
                        WeeksRemaining13WeekAverage = GetValue<string>(properties, "Weeks Remaining (at 13 wk avg)"),
                        NumberOfWeeks90SellThru = GetValue<string>(properties, "# of Weeks to 90% Sell-Thru") ,
                        NumberOfWeeks80SellThru = GetValue<string>(properties, "# of Weeks to 80% Sell-Thru"),
                    });
                }

                return result;
            });
        }

        /// <summary>
        /// calls spGame_GetDetailsByGameID
        /// </summary>
        /// <param name="customer"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public async Task<GameDetails> GetGameDetails(string customer, int gameId)
        {
            #region sqlmapper
            var columnMaps = new Dictionary<string, string>
            {
                { "Current Year Sales", "CurrentYearSales" },
                { "Last Year Sales", "LastYearSales" },
                { "Last 2 Year Sales", "Last2YearSales" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var detailedGameSearchMap = new CustomPropertyTypeMap(
                typeof(GameDetails),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(GameDetails), detailedGameSearchMap);
            #endregion

            return await WithConnection(async c =>
            {
                var result = await c.QueryFirstOrDefaultAsync<GameDetails>(
                    sql: "spGame_GetDetailsByGameID",
                    param: new
                    {
                        CustomerCode = customer,
                        GameId = gameId
                    },
                    commandType: CommandType.StoredProcedure);

                return result;
            });
        }

        /// <summary>
        /// calls spFavorite_Get
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<IEnumerable<FavoriteGameDetails>> GetFavoriteGames(ApplicationUser user)
        {
            #region sqlmapper
            var columnMaps = new Dictionary<string, string>
            {
                { "Path", "ImgName" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var detailedFavoriteMap = new CustomPropertyTypeMap(
                typeof(FavoriteGameDetails),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(FavoriteGameDetails), detailedFavoriteMap);
            #endregion 

            return await WithConnection(async c =>
            {
                var list = await c.QueryAsync<FavoriteGameDetails>(
                    "spFavorite_Get",
                    new { UserName = user.UserName },
                    commandType: CommandType.StoredProcedure);


                return list;
            });
        }

        /// <summary>
        /// calls spFavorite_Del
        /// </summary>
        /// <param name="favoriteId"></param>
        /// <returns></returns>
        public async Task<bool> DeleteFavorite(int favoriteId)
        {
            return await WithConnection(async c =>
            {
                DynamicParameters Params = new DynamicParameters();
                Params.Add("@FavoriteID", favoriteId);
                Params.Add("@RetVal", dbType: DbType.Int32, direction: ParameterDirection.Output);
                Params.Add("@RetMsg", "", dbType: DbType.AnsiString, direction: ParameterDirection.Output);
                await c.ExecuteAsync("dbo.spFavorite_Del", Params, commandType: CommandType.StoredProcedure);
                var result = Params.Get<int>("RetVal");
                return result == 0;
            });
        }

        /// <summary>
        /// calls spFavorite_Save
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="user"></param>
        /// <returns>true if added</returns>
        public async Task<bool> SaveFavorite(int gameId, ApplicationUser user)
        {
            return await WithConnection(async c =>
            {
                DynamicParameters Params = new DynamicParameters();
                Params.Add("@UserName", user.NormalizedUserName);
                Params.Add("@GameID", gameId);
                Params.Add("@RetVal", dbType: DbType.Int32, direction: ParameterDirection.Output);
                Params.Add("@RetMsg", "", dbType: DbType.AnsiString, direction: ParameterDirection.Output);
                await c.ExecuteAsync("dbo.spFavorite_Save", Params, commandType: CommandType.StoredProcedure);
                var result = Params.Get<int>("RetVal");
                return result == 0;
            });            
        }

        /// <summary>
        /// calls spGame_GetPrizeStructure
        /// </summary>
        /// <param name="customer"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<GamePrizeStructure>> GetGamePrizeStructure(string customer, int gameId)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spGame_GetPrizeStructure",
                    param: new
                    {
                        GameId = gameId,
                        CustomerCode = customer
                    },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<GamePrizeStructure>();
            });
        }

        /// <summary>
        /// calls spGame_GetEWRByGameID
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<GameSales>> GetGameSales(int gameId)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryAsync(
                    sql: "spGame_GetEWRByGameID",
                    param: new { gameId },
                    commandType: CommandType.StoredProcedure);

                var result = new List<GameSales>();

                foreach (var row in dr)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new GameSales
                    {
                        WeekNumber = GetValue<int>(properties, "Week #"),
                        WeekEnding = GetValue<string>(properties, "WeekEnding"),
                        Sales = GetValue<decimal>(properties, "Sales"),
                        AccumSellThru = GetValue<string>(properties, "Accum Sell-Thru"),
                        RunningWeeksRemaining = GetValue<int>(properties, "Running Weeks Remaining"),
                        EstimatedWeeksRemaining = GetValue<int>(properties, "Estimated Weeks Remaining")
                    });
                }

                return result;
            });
        }

        /// <summary>
        /// calls spGame_GetCloseSalesThru
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<ReportClosed>> GetClosedSalesReport(ReportClosedRequest req)
        {
            return await WithConnection(async c =>
            {
                var data = await c.QueryAsync(
                        "spGame_GetCloseSalesThru",
                        new { CustomerCode = req.Customer, req.TicketPrice, req.StartDate, req.EndDate, VendorType = VENDOR_TYPE_ALL },
                        commandType: CommandType.StoredProcedure);

                var result = new List<ReportClosed>();
                foreach (var row in data)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new ReportClosed
                    {
                        GameID = GetValue<int>(properties, "GameID"),
                        GameReference = GetValue<string>(properties, "GameReference"),
                        GameName = GetValue<string>(properties, "GameName"),
                        LaunchDate = GetValue<DateTime>(properties, "Launch Date"),
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        TicketsOrdered = GetValue<int>(properties, "TicketsOrdered"),
                        TicketsReceived = GetValue<int>(properties, "TicketsReceived"),
                        NumberWeeksOnSale = GetValue<int>(properties, "# Weeks On Sale"),
                        FinalWeekEndingDate = GetValue<DateTime>(properties, "Final Week Ending Date"),
                        FinalWeekSales = GetValue<decimal>(properties, "Final Week Sales"),
                        TicketQtyReceived = GetValue<int>(properties, "Ticket Qty Received"),
                        TicketQtyRemaining = GetValue<decimal>(properties, "Ticket Qty Remaining"),
                        TotalSales = GetValue<decimal>(properties, "Total Sales"),
                        AverageSales = GetValue<decimal>(properties, "Average Sales"),
                        SellThru = GetValue<string>(properties, "Sell-Thru"),
                        NumberOfWeeks90SellThru = GetValue<string>(properties, "# of Weeks to 90% Sell-Thru"),
                        NumberOfWeeks80SellThru = GetValue<string>(properties, "# of Weeks to 80% Sell-Thru")
                    });
                }

                return result;
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<GameSearchResult>> GetGameSearch(GameSearchRequest req)
        {
            return await WithConnection(async c =>
            {
                var results = await c.QueryAsync<GameSearchResult>(
                    sql: "spGame_Search",
                    param: new
                    {
                        CustomerCode = req.Customer,
                        GameName = req.GameName ?? string.Empty,
                        MinimumPerformance = (req.MinimumPerformance == null || req.MinimumPerformance == 0) ? -1 : req.MinimumPerformance,
                        TicketPrice = req.TicketPrice ?? -1,                        
                        ThemeIDs = req.ThemeIDs ?? null,
                        ColorIDs = req.ColorIDs ?? null,
                        PlayStyleIDs = req.PlayStyleIDs ?? null,
                        FeatureIDs = req.FeatureIDs ?? null,
                        SpecialtyOptionIDs = req.SpecialtyOptionIDs ?? null,
                        PaperStockCategoryIDs = req.PaperStockCategoryIDs ?? null,
                        JurisdictionIDs = req.JurisdictionIDs ?? null,
                        SortColumn = req.SortColumn ?? null,
                        SortDirection = req.SortDirection ?? null,
                        PageIndex = req.PageIndex ?? 1,
                        PageSize = req.PageSize ?? 20,
                        StartDate = req.StartDate ?? null,
                        EndDate = req.EndDate ?? null
                    },
                    commandType: CommandType.StoredProcedure);
                return results;
            });
        }
        #endregion

        #region sp
        /// <summary>
        /// calls spWeeklySalesPenetration_GetRateOfSalesByDateAndPrice
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<WeeksInMarket>> GetWeeksInMarket(WeeksInMarketRequest req)
        {
            #region sqlmapper
            var columnMaps = new Dictionary<string, string>
            {
                {"#Of Tickets","NumberOfTickets"},
                {"Retailer Count (Activated)","ActivatedRetailerCount"},
                {"Retailer Count (Activated/Confirmed/Issued/Settled)","RetailerCount"},
                {"Current Penetration (based on activations)","CurrentPenetrationBasedOnActivations"},
                {"Current Penetration (based on confirmed and issued, and activated settled","CurrentPenetration"},
                {"Validation Total","ValidationTotal"},
                {"Running Total","RunningTotal"},
                {"Tooltip Info","TooltipInfo"},
                {"Tooltip Confirmed Info","TooltipConfirmedInfo"},
                {"Pen %","PenPercentage"}
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var weeksInMarketMap = new CustomPropertyTypeMap(
                typeof(WeeksInMarket),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(WeeksInMarket), weeksInMarketMap);
            #endregion

            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spWeeklySalesPenetration_GetRateOfSalesByDateAndPrice",
                    param: new
                    {
                        CustomerCode = req.Customer,
                        req.EndOfWeek,
                        req.TicketPrice
                    },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<WeeksInMarket>();
            });
        }


        /// <summary>
        /// calls spWeeklySalesPenetration_GetWeekEnding
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        public async Task<IEnumerable<SalesWeekEndings>> GetSalesWeekEndings(string customer)
        {
            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spWeeklySalesPenetration_GetWeekEnding",
                    param: new { CustomerCode = customer },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<SalesWeekEndings>();
            });
        }

        /// <summary>
        /// calls spWeeklySalesPenetration_GetRateOfSalesWithExclude
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<RateOfSalesTrend>> GetRateOfSalesTrend(RateOfSalesTrendRequest req)
        {
            #region sqlmapper
            var rateOfSalesColumnMaps = new Dictionary<string, string>
            {
                { "Price-Name", "PriceName" },
                { "Rate of Sales", "Rate" },
                { "Tooltip Info", "TooltipInfo" },
                { "Pen %", "PenPercentage" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (rateOfSalesColumnMaps.ContainsKey(columnName))
                    return type.GetProperty(rateOfSalesColumnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var rateOfSalesMap = new CustomPropertyTypeMap(
                typeof(RateOfSalesTrend),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(RateOfSalesTrend), rateOfSalesMap);
            #endregion

            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spWeeklySalesPenetration_GetRateOfSalesWithExclude",
                    param: new
                    {
                        CustomerCode = req.Customer,
                        req.StartDate,
                        req.TicketPrice,
                        IsExclude = 0
                    },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<RateOfSalesTrend>();
            });
        }

        /// <summary>
        /// calls spWeeklySalesPenetration_GetRateOfSalesByDate
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<RateOfSales>> GetRateOfSales(RateOfSalesRequest req)
        {
            #region sqlmapper
            var rateOfSalesColumnMaps = new Dictionary<string, string>
            {
                { "Price-Name", "PriceName" },
                { "Game Name", "GameName" },
                { "Rate of Sales", "Rate" },
                { "Tooltip Info", "TooltipInfo" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (rateOfSalesColumnMaps.ContainsKey(columnName))
                    return type.GetProperty(rateOfSalesColumnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var rateOfSalesMap = new CustomPropertyTypeMap(
                typeof(RateOfSales),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(RateOfSales), rateOfSalesMap);
            #endregion

            return await WithConnection(async c =>
            {
                var dr = await c.QueryMultipleAsync(
                    sql: "spWeeklySalesPenetration_GetRateOfSalesByDate",
                    param: new
                    {
                        CustomerCode = req.Customer,
                        req.EndOfWeek
                    },
                    commandType: CommandType.StoredProcedure);

                return await dr.ReadAsync<RateOfSales>();
            });
        }

        /// <summary>
        /// calls spWeeklySalesPenetration_Get
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public async Task<IEnumerable<WeeklySalesPenetration>> GetWeeklySalesPenetration(WeeklySalesPenetrationRequest req)
        {
            return await WithConnection(async c =>
            {
                var data = await c.QueryAsync(
                        "spWeeklySalesPenetration_Get",
                        new
                        {
                            CustomerCode = req.Customer,
                            EndOfWeek = req.EndOfWeek,
                            TicketPrice = req.TicketPrice
                        },
                        commandType: CommandType.StoredProcedure);

                var result = new List<WeeklySalesPenetration>();
                foreach (var row in data)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new WeeklySalesPenetration
                    {
                        GameID = GetValue<int>(properties, "GameID"),
                        GameNumber = GetValue<int>(properties, "GameNumber"),
                        GameName = GetValue<string>(properties, "GameName"),
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        ActivatedRetailerCount = GetValue<int>(properties, "Retailer Count (Activated)"),
                        RetailerCount = GetValue<int>(properties, "Retailer Count (Activated/Confirmed/Issued/Settled)"),
                        TotalRetailers = GetValue<int>(properties, "TotalRetailers"),
                        CurrentPenetrationBasedOnActivations = GetValue<decimal>(properties, "Current Penetration (based on activations)"),
                        CurrentPenetration = GetValue<decimal>(properties, "Current Penetration (based on confirmed and issued, and activated settled"),
                        ActualPrintRun = GetValue<decimal>(properties, "ActualPrintRun"),
                        CurrentWeekValidations = GetValue<decimal>(properties, "Curr Week Validations"),
                        TotalValidations = GetValue<decimal>(properties, "Total Validations (up to Curr Week Selected)"),
                        TooltipInfo = GetValue<string>(properties, "Tooltip Info"),
                        TooltipConfirmedInfo = GetValue<string>(properties, "Tooltip Confirmed Info"),
                        PenPercentage = GetValue<decimal>(properties, "Pen %")
                    });
                }

                return result;
            });
        }
        #endregion
    }
}
