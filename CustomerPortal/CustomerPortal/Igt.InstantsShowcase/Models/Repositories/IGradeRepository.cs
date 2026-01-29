using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;

namespace IGT.CustomerPortal.API.DAL
{
    public class IGradeRepository : Repository
    {
        public IGradeRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public IDbConnection OpenConnection()
        {
            return OpenConnection("iGrade");
        }

        public async Task<IEnumerable<LotteryWithSalesInfo>> LotteryWithSalesInfo(int? country = null, string code = null, IDbConnection connection = null)
        {
            const string sql = "dbo.uspSelectLotteryWithSalesInfo";
            var result = new List<LotteryWithSalesInfo>();

            var countries = new List<int>();
            if (!country.HasValue)
            {
                countries.AddRange(new[] { 1, 2 }); // Domestic and International customers
            }
            else if (new[] { 1, 2 }.Contains(country.Value))
            {
                countries.Add(country.Value);
            }

            bool existingConnection = true;
            if (connection == null)
            {
                existingConnection = false;
                connection = OpenConnection("iGrade");
            }

            try
            {
                string currentCode;
                foreach (var c in countries)
                {
                    var queryResult = await connection.QueryAsync(
                            sql,
                            new { intCountryTK = c },
                            commandType: CommandType.StoredProcedure);

                    foreach (var row in queryResult)
                    {
                        var properties = (IDictionary<string, object>)row;
                        currentCode = properties["SubDivisionCode"].ToString()?.Trim();
                        if (string.IsNullOrEmpty(code) || code.Equals(currentCode))
                        {
                            result.Add(new LotteryWithSalesInfo
                            {
                                Id = int.Parse(properties["LotteryTK"].ToString()),
                                Name = properties["BusinessName"].ToString(),
                                Logo = properties["LogoPath"]?.ToString(),
                                Code = currentCode
                            });
                        }
                    }
                }
            }
            finally
            {
                if (!existingConnection)
                {
                    CloseConnection(connection);
                    connection.Dispose();
                }
            }

            return result;
        }

        public async Task<LotteryTotalYTDSales> LotteryTotalYTDSales(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql;
            if (yearType == 1)
            {
                sql = "dbo.uspGetLotteryTotalYTDSales_Structured_CalYear";
            }
            else
            {
                sql = "dbo.uspGetLotteryTotalYTDSales_Structured";
            }
            var result = new LotteryTotalYTDSales();

            var reader = await connection.QueryMultipleAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            dynamic row;
            bool firstRow = true;
            while (!reader.IsConsumed)
            {
                row = reader.ReadSingle();
                var properties = (IDictionary<string, object>)row;

                if (firstRow)
                {
                    result.WeeklySales.CurrWeek = GetValue<DateTime>(properties, "Curr Week");
                    result.WeeklySales.CurrWeekSales = GetValue<decimal>(properties, "Curr Week Sales");
                    result.WeeklySales.YTDSales = GetValue<decimal>(properties, "YTD Sales");
                    result.WeeklySales.PriorYearWeek = GetValue<DateTime>(properties, "Prior Year Week");
                    result.WeeklySales.PriorYearWeekSales = GetValue<decimal>(properties, "YTD Sales");
                    result.WeeklySales.PriorYearYTDSales = GetValue<decimal>(properties, "Prior Year YTD Sales");
                    result.WeeklySales.WeekDifference = GetValue<decimal>(properties, "Week Difference");
                    result.WeeklySales.PercentChangeWeek = GetValue<string>(properties, "% Change Week");
                    result.WeeklySales.YTDDifference = GetValue<decimal>(properties, "YTD Difference");
                    result.WeeklySales.PercentChangeYear = GetValue<string>(properties, "% Change Year");
                    result.WeeklySales.Weeks = GetValue<int>(properties, "Weeks");
                }
                else
                {
                    var ticket = new Ticketbreakdown
                    {
                        TicketPrice = GetValue<decimal>(properties, "Ticket Price"),
                        CurrWeekSales = GetValue<decimal>(properties, "Curr Week Sales"),
                        YTDSales = GetValue<decimal>(properties, "YTD Sales"),
                        PercentSalesYTD = GetValue<string>(properties, "% Sales YTD"),
                        PriorYearWeekSales = GetValue<decimal>(properties, "Prior Year Week Sales"),
                        PriorYearYTDSales = GetValue<decimal>(properties, "Prior Year YTD Sales"),
                        PercentSalesPriorYTD = GetValue<string>(properties, "% Sales Prior YTD"),
                        WeekDifference = GetValue<decimal>(properties, "Week Difference"),
                        PercentChangeWeek = GetValue<string>(properties, "% Change Week"),
                        YTDDifference = GetValue<decimal>(properties, "YTD Difference"),
                        PercentChangeYear = GetValue<string>(properties, "% Change Year")
                    };
                    result.TicketBreakdown.Add(ticket);
                }

                firstRow = false;
            }

            return result;
        }


        public async Task<IEnumerable<LotteryAverageSellingPrice>> LotteryAverageSellingPrice(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql;
            if (yearType == 1)
            {
                sql = "dbo.uspChartLotteryAverageSellingPrice_Structured_CalYear";
            }
            else
            {
                sql = "dbo.uspChartLotteryAverageSellingPrice_Structured";
            }

            var result = new List<LotteryAverageSellingPrice>();

            dynamic row;
            var reader = await connection.QueryMultipleAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);
            while (!reader.IsConsumed)
            {
                row = reader.ReadSingle();
                var properties = (IDictionary<string, object>)row;

                decimal averagePrice;
                if (!decimal.TryParse(properties["Average Price Current Year"]?.ToString(), out averagePrice))
                {
                    decimal.TryParse(properties["Average Price Prior Year"]?.ToString(), out averagePrice);
                }

                result.Add(new LotteryAverageSellingPrice
                {
                    TotalSales = decimal.Parse(properties["Total Sales"].ToString()),
                    TotalQuantity = decimal.Parse(properties["Total Quantity"].ToString()),
                    AveragePrice = averagePrice,
                    Year = int.Parse(properties["tmpYear"].ToString())
                });
            }

            return result;
        }

        public async Task<IEnumerable<LotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice>> LotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql;
            if (yearType == 1)
            {
                sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice_Structured_CalYear";
            }
            else
            {
                sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice_Structured";
            }

            var result = new List<LotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice>();
            var reader = await connection.QueryMultipleAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            while (!reader.IsConsumed)
            {
                IEnumerable<dynamic> rows = reader.Read();
                foreach (var row in rows)
                {
                    var properties = (IDictionary<string, object>)row;

                    decimal ticketPrice;
                    if (!decimal.TryParse(properties["tmpTicketPriceCurr"]?.ToString(), out ticketPrice))
                    {
                        decimal.TryParse(properties["tmpTicketPricePrior"]?.ToString(), out ticketPrice);
                    }

                    result.Add(new LotteryFYTDWeeklySalesAndPriorYearSnapshotByTicketPrice
                    {
                        WeekSales = decimal.Parse(properties["WeekSales"].ToString()),
                        Year = int.Parse(properties["Year"].ToString()),
                        TicketPrice = ticketPrice
                    });
                }
            }

            return result;
        }

        public async Task<IEnumerable<LotteryFYTDWeeklySalesAndPriorYearByTicketPrice>> LotteryFYTDWeeklySalesAndPriorYearByTicketPrice(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql;
            if (yearType == 1)
            {
                sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYearByTicketPrice_Structured_CalYear";
            }
            else
            {
                sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYearByTicketPrice_Structured";
            }

            var result = new List<LotteryFYTDWeeklySalesAndPriorYearByTicketPrice>();
            var reader = await connection.QueryMultipleAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            while (!reader.IsConsumed)
            {
                IEnumerable<dynamic> rows = reader.Read();
                foreach (var row in rows)
                {
                    var properties = (IDictionary<string, object>)row;

                    decimal ticketPrice;
                    if (!decimal.TryParse(properties["tmpTicketPriceCurr"]?.ToString(), out ticketPrice))
                    {
                        decimal.TryParse(properties["tmpTicketPricePrior"]?.ToString(), out ticketPrice);
                    }

                    result.Add(new LotteryFYTDWeeklySalesAndPriorYearByTicketPrice
                    {
                        WeekSales = decimal.Parse(properties["WeekSales"].ToString()),
                        Year = int.Parse(properties["Year"].ToString()),
                        TicketPrice = ticketPrice
                    });
                }
            }

            return result;
        }

        public async Task<IEnumerable<LotteryTicketPrice>> LotteryTicketPriceWhenSales(int lotteryId, IDbConnection connection)
        {
            string sql = "dbo.uspSelectLotteryTicketPriceWhenSales";

            var result = new List<LotteryTicketPrice>();
            var queryResult = await connection.QueryAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            foreach (var row in queryResult)
            {
                var properties = (IDictionary<string, object>)row;
                result.Add(new LotteryTicketPrice
                {
                    TicketPrice = decimal.Parse(properties["TicketPrice"].ToString())
                });
            }
            return result;
        }

        //public async Task<IEnumerable<LotteryPrimaryTheme>> LotteryPrimaryThemesLast12Months(int lotteryId, IDbConnection connection)
        //{
        //    var ticketPrices = await LotteryTicketPriceWhenSales(lotteryId, connection);
        //    List<LotteryPrimaryTheme> result = null;
        //    if (ticketPrices.Any())
        //    {
        //        string sql = "dbo.uspChartLotteryPrimaryThemesLast12Months";
        //        result = new List<LotteryPrimaryTheme>();

        //        foreach (var price in ticketPrices)
        //        {
        //            var queryResult = await connection.QueryAsync(
        //                    sql,
        //                    new { intLotteryTK = lotteryId, intTicketPrice = price.TicketPrice },
        //                    commandType: CommandType.StoredProcedure);

        //            foreach (var row in queryResult)
        //            {
        //                var properties = (IDictionary<string, object>)row;
        //                result.Add(new LotteryPrimaryTheme
        //                {
        //                    TicketPrice = price.TicketPrice,
        //                    Number = int.Parse(properties[""].ToString()),
        //                    PrimaryTheme = properties["PrimaryTheme"].ToString()
        //                });
        //            }

        //        }
        //    }
        //    return result;
        //}

        //public async Task<IEnumerable<LotteryBingoCrossword>> LotteryBingoCrossword(int yearType, int lotteryId, IDbConnection connection)
        //{
        //    string sql;
        //    if (yearType == 1)
        //    {
        //        sql = "dbo.uspChartLotteryBingoCrossword_Structured_CalYear";
        //    }
        //    else
        //    {
        //        sql = "dbo.uspChartLotteryBingoCrossword_Structured";
        //    }

        //    var result = new List<LotteryBingoCrossword>();
        //    var queryResult = await connection.QueryAsync(
        //            sql,
        //            new { intLotteryTK = lotteryId },
        //            commandType: CommandType.StoredProcedure);

        //    foreach (var row in queryResult)
        //    {
        //        var properties = (IDictionary<string, object>)row;
        //        result.Add(new LotteryBingoCrossword
        //        {
        //            Theme = properties["Theme"].ToString(),
        //            WeekSales = decimal.Parse(properties["WeekSales"].ToString()),
        //            YTDSales = decimal.Parse(properties["YTDSales"].ToString()),
        //        });
        //    }
        //    return result;
        //}

        //public async Task<IEnumerable<LotteryFYTDWeeklySalesAndPriorYears>> LotteryFYTDWeeklySalesAndPriorYears(int yearType, int lotteryId, IDbConnection connection)
        //{
        //    string sql;
        //    if (yearType == 1)
        //    {
        //        sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYears_Structured_CalYear";
        //    }
        //    else
        //    {
        //        sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYears_Structured";
        //    }

        //    var result = new List<LotteryFYTDWeeklySalesAndPriorYears>();
        //    var reader = await connection.QueryMultipleAsync(
        //            sql,
        //            new { intLotteryTK = lotteryId },
        //            commandType: CommandType.StoredProcedure);

        //    while (!reader.IsConsumed)
        //    {
        //        IEnumerable<dynamic> rows = reader.Read();
        //        foreach (var row in rows)
        //        {
        //            var properties = (IDictionary<string, object>)row;

        //            result.Add(new LotteryFYTDWeeklySalesAndPriorYears
        //            {
        //                WeekEndDate = DateTime.Parse(properties["WeekEndDate"].ToString()),
        //                WeekSales = decimal.Parse(properties["WeekSales"].ToString()),
        //                Year = int.Parse(properties["Year"].ToString()),
        //                Month = properties["Month"].ToString()
        //            });
        //        }
        //    }

        //    return result;
        //}

        public async Task<IEnumerable<WeeklySalesAndPriorYearsByTicketPrice>> LotteryFYTDWeeklySalesAndPriorYearsByTicketPriceLineChart(int yearType, int lotteryId, IDbConnection connection)
        {
            var ticketPrices = await LotteryTicketPriceWhenSales(lotteryId, connection);
            List<WeeklySalesAndPriorYearsByTicketPrice> result = null;
            if (ticketPrices.Any())
            {
                string sql;
                if (yearType == 1)
                {
                    sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYearsByTicketPriceLineChart_Structured_CalYear";
                }
                else
                {
                    sql = "dbo.uspChartLotteryFYTDWeeklySalesAndPriorYearsByTicketPriceLineChart_Structured";
                }

                result = new List<WeeklySalesAndPriorYearsByTicketPrice>();

                foreach (var price in ticketPrices)
                {
                    var reader = await connection.QueryMultipleAsync(
                        sql,
                        new { intLotteryTK = lotteryId, intTicketPrice = price.TicketPrice },
                        commandType: CommandType.StoredProcedure);

                    while (!reader.IsConsumed)
                    {
                        IEnumerable<dynamic> rows = reader.Read();
                        foreach (var row in rows)
                        {
                            var properties = (IDictionary<string, object>)row;

                            result.Add(new WeeklySalesAndPriorYearsByTicketPrice
                            {
                                WeekEndDate = DateTime.Parse(properties["WeekEndDate"].ToString()),
                                WeekSales = decimal.Parse(properties["WeekSales"].ToString()),
                                Year = int.Parse(properties["Year"].ToString()),
                                Month = properties["Month"].ToString(),
                                TicketPrice = decimal.Parse(properties["TicketPrice"].ToString())
                            });
                        }
                    }
                }
            }

            return result;
        }

        public async Task<IEnumerable<LotteryTotalGameCount>> LotteryTotalGameCountFYTDAndPrior5Years(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql;
            if (yearType == 1)
            {
                sql = "dbo.uspChartLotteryTotalGameCountFYTDAndPrior5Years_Structured_CalYear";
            }
            else
            {
                sql = "dbo.uspChartLotteryTotalGameCountFYTDAndPrior5Years_Structured";
            }

            var result = new List<LotteryTotalGameCount>();
            var queryResult = await connection.QueryAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            foreach (var row in queryResult)
            {
                var properties = (IDictionary<string, object>)row;
                result.Add(new LotteryTotalGameCount
                {
                    Year = int.Parse(properties["Year"].ToString()),
                    GameCount = int.Parse(properties["Game Count"].ToString())
                });
            }
            return result;
        }

        public async Task<IEnumerable<LotteryGameCountByPrice>> LotteryGameCountByPrice(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql;
            if (yearType == 1)
            {
                sql = "dbo.uspChartLotteryFYTDGameCountByPrice_Structured_CalYear";
            }
            else
            {
                sql = "dbo.uspChartLotteryFYTDGameCountByPrice_Structured";
            }

            var result = new List<LotteryGameCountByPrice>();
            var queryResult = await connection.QueryAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            foreach (var row in queryResult)
            {
                var properties = (IDictionary<string, object>)row;
                result.Add(new LotteryGameCountByPrice
                {
                    TicketPrice = decimal.Parse(properties["TicketPrice"].ToString()),
                    GameCount = int.Parse(properties["Game Count"].ToString())
                });
            }
            return result;
        }

        public async Task<IEnumerable<LotteryGameCountPriorYearsByTicketPrice>> LotteryGameCountPriorYearsByTicketPrice(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql;
            if (yearType == 1)
            {
                sql = "dbo.uspChartLotteryGameCountFYTDAndPrior5YearsByTicketPrice_Structured_CalYear";
            }
            else
            {
                sql = "dbo.uspChartLotteryGameCountFYTDAndPrior5YearsByTicketPrice_Structured";
            }

            var result = new List<LotteryGameCountPriorYearsByTicketPrice>();
            var queryResult = await connection.QueryAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            foreach (var row in queryResult)
            {
                var properties = (IDictionary<string, object>)row;
                result.Add(new LotteryGameCountPriorYearsByTicketPrice
                {
                    Year = int.Parse(properties["Year"].ToString()),
                    TicketPrice = decimal.Parse(properties["TicketPrice"].ToString()),
                    GameCount = int.Parse(properties["Game Count"].ToString()),
                    Tooltip = properties["Tooltip Info"].ToString()
                });
            }
            return result;
        }

        public async Task<IEnumerable<ChartIndexed>> ChartIndexed(string type, int yearType, int lotteryId, IDbConnection connection)
        {
            string sql = null;
            switch (type)
            {
                case "theme":
                    sql = "dbo.uspChartThemeIndexed_iGrade_dynamic";
                    break;
                case "feature":
                    sql = "dbo.uspChartFeatureIndexed_iGrade_dynamic";
                    break;
                case "playstyle":
                    sql = "dbo.uspChartPlayStyleIndexed_iGrade_dynamic";
                    break;
            }

            var result = new List<ChartIndexed>();
            var reader = await connection.QueryMultipleAsync(
                    sql,
                    new { intLotteryTK = lotteryId },
                    commandType: CommandType.StoredProcedure);

            bool first = true;
            while (!reader.IsConsumed)
            {
                IEnumerable<dynamic> rows = reader.Read();
                foreach (var row in rows)
                {
                    if (first)
                    {
                        first = false;
                        continue;
                    }

                    var properties = (IDictionary<string, object>)row;
                    var chartTheme = new ChartIndexed
                    {
                        Group = properties["Group"].ToString(),
                        AverageIndex = int.Parse(properties["Average Index All Games"].ToString()),
                        GamesCount = int.Parse(properties["Count of Games"].ToString()),
                        TicketPrices = new Dictionary<string, string>()
                    };
                    foreach (var key in properties.Keys)
                    {
                        if (!new[] { "Group", "Average Index All Games", "Count of Games" }.Contains(key))
                        {
                            chartTheme.TicketPrices.Add(key, properties[key]?.ToString());
                        }
                    }

                    result.Add(chartTheme);
                }
            }

            return result;
        }

        public async Task<IEnumerable<int>> YearsForLottery(int yearType, int lotteryId, IDbConnection connection)
        {
            string sql = "uspSelectFiscalOrCalendarYearsForLottery";

            var result = new List<int>();
            var queryResult = await connection.QueryAsync(
                    sql,
                    new { intLotteryTK = lotteryId, strYearType = yearType },
                    commandType: CommandType.StoredProcedure);

            foreach (var row in queryResult)
            {
                var properties = (IDictionary<string, object>)row;
                result.Add(GetValue<int>(properties, "Year"));
            }
            return result;
        }

        public async Task<IEnumerable<SalesWeekEndingsForYear>> SalesWeekEndingsForYear(int year, int yearType, int lotteryId, IDbConnection connection)
        {
            string sql = "uspSelectSalesWeekEndingsForYear";

            var result = new List<SalesWeekEndingsForYear>();
            var queryResult = await connection.QueryAsync(
                    sql,
                    new { intLotteryTK = lotteryId, strYear = year, strYearType = yearType },
                    commandType: CommandType.StoredProcedure);

            foreach (var row in queryResult)
            {
                var properties = (IDictionary<string, object>)row;
                result.Add(new SalesWeekEndingsForYear
                {
                    WeekEnding = GetValue<string>(properties, "Week Ending"),
                    WeekEndDate = GetValue<DateTime>(properties, "WeekEndDate"),
                    WeekStart = GetValue<string>(properties, "Week Start"),
                    WeekStartDate = GetValue<DateTime>(properties, "WeekStartDate")
                });
            }
            return result;
        }

        public async Task<LotteryTotalYTDSales> LotteryTotalYTDSalesSelectWithDate(int yearType, int year, int lotteryId, DateTime week, IDbConnection connection)
        {
            string sql = null;
            if (yearType == 1)
            {
                sql = "dbo.uspGetLotteryTotalYTDSales_SelectWithDatePassedInFiscal";
            }
            else
            {
                sql = "dbo.uspGetLotteryTotalYTDSales_SelectWithDatePassedInCalendar";
            }

            var result = new LotteryTotalYTDSales();

            var reader = await connection.QueryMultipleAsync(
                    sql,
                    new { intLotteryTK = lotteryId, strYear = year, dtWeek = week },
                    commandType: CommandType.StoredProcedure);

            dynamic row;
            bool firstRow = true;
            while (!reader.IsConsumed)
            {
                row = reader.ReadSingle();
                var properties = (IDictionary<string, object>)row;

                if (firstRow)
                {
                    result.WeeklySales.CurrWeek = GetValue<DateTime>(properties, "Curr Week");
                    result.WeeklySales.CurrWeekSales = GetValue<decimal>(properties, "Curr Week Sales");
                    result.WeeklySales.YTDSales = GetValue<decimal>(properties, "YTD Sales");
                    result.WeeklySales.PriorYearWeek = GetValue<DateTime>(properties, "Prior Year Week");
                    result.WeeklySales.PriorYearWeekSales = GetValue<decimal>(properties, "YTD Sales");
                    result.WeeklySales.PriorYearYTDSales = GetValue<decimal>(properties, "Prior Year YTD Sales");
                    result.WeeklySales.WeekDifference = GetValue<decimal>(properties, "Week Difference");
                    result.WeeklySales.PercentChangeWeek = GetValue<string>(properties, "% Change Week");
                    result.WeeklySales.YTDDifference = GetValue<decimal>(properties, "YTD Difference");
                    result.WeeklySales.PercentChangeYear = GetValue<string>(properties, "% Change Year");
                    result.WeeklySales.Weeks = GetValue<int>(properties, "Weeks");
                }
                else
                {
                    var ticket = new Ticketbreakdown
                    {
                        TicketPrice = GetValue<decimal>(properties, "Ticket Price"),
                        CurrWeekSales = GetValue<decimal>(properties, "Curr Week Sales"),
                        YTDSales = GetValue<decimal>(properties, "YTD Sales"),
                        PercentSalesYTD = GetValue<string>(properties, "% Sales YTD"),
                        PriorYearWeekSales = GetValue<decimal>(properties, "Prior Year Week Sales"),
                        PriorYearYTDSales = GetValue<decimal>(properties, "Prior Year YTD Sales"),
                        PercentSalesPriorYTD = GetValue<string>(properties, "% Sales Prior YTD"),
                        WeekDifference = GetValue<decimal>(properties, "Week Difference"),
                        PercentChangeWeek = GetValue<string>(properties, "% Change Week"),
                        YTDDifference = GetValue<decimal>(properties, "YTD Difference"),
                        PercentChangeYear = GetValue<string>(properties, "% Change Year")
                    };
                    result.TicketBreakdown.Add(ticket);
                }

                firstRow = false;
            }

            return result;
        }

    }
}
