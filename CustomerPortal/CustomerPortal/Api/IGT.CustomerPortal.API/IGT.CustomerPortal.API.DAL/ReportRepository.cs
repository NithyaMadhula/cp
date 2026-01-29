using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class ReportRepository : Repository
    {
        const int VENDOR_TYPE_ALL = 0;

        public ReportRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<ReportActive>> ListActive(string customerCode)
        {
            string sql = "spGame_GetActiveSalesThru";

            var result = new List<ReportActive>();

            using (var connection = OpenConnection())
            {
                object param = string.IsNullOrEmpty(customerCode) ? null : new { CustomerCode = customerCode, VendorType = VENDOR_TYPE_ALL };
                var reader = await connection.QueryAsync(
                        sql,
                        param,
                        commandType: CommandType.StoredProcedure);

                foreach (var row in reader)
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
                        NumberOfWeeks90SellThru = GetValue<string>(properties, "# of Weeks to 90% Sell-Thru"),
                        NumberOfWeeks80SellThru = GetValue<string>(properties, "# of Weeks to 80% Sell-Thru"),
                    });
                }
            }

            return result;
        }

        public async Task<IEnumerable<ReportClosed>> ListClosed(string customerCode, decimal ticketPrice, string startDate, string endDate)
        {
            string sql = "spGame_GetCloseSalesThru";

            var result = new List<ReportClosed>();

            using (var connection = OpenConnection())
            {
                var reader = await connection.QueryAsync(
                        sql,
                        new { CustomerCode = customerCode, TicketPrice = ticketPrice, StartDate = startDate, EndDate = endDate, VendorType = VENDOR_TYPE_ALL },
                        commandType: CommandType.StoredProcedure);

                foreach (var row in reader)
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
            }

            return result;
        }

        public async Task<IEnumerable<ReportPricePointDynamic>> ListPricePointDynamic(string customerCode, decimal ticketPrice, string startDate, string endDate)
        {
            string sql = "spLottery_GetSalesAndSellThru";

            var result = new List<ReportPricePointDynamic>();

            using (var connection = OpenConnection())
            {
                var reader = await connection.QueryAsync(
                        sql,
                        new { CustomerCode = customerCode, TicketPrice = ticketPrice, StartDate = startDate, EndDate = endDate },
                        commandType: CommandType.StoredProcedure);

                ReportPricePointDynamic model;
                foreach (var row in reader)
                {
                    var properties = (IDictionary<string, object>)row;

                    model = new ReportPricePointDynamic
                    {
                        GameID = GetValue<int>(properties, "GameID"),
                        GameReference = GetValue<string>(properties, "GameReference"),
                        GameName = GetValue<string>(properties, "GameName"),
                        StartDate = GetValue<DateTime>(properties, "StartDate"),
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        Type = GetValue<string>(properties, "Type"),
                        Columns = new Dictionary<string, string>()
                    };
                    foreach (var key in properties.Keys)
                    {
                        if (!new[] { "GameID", "GameReference", "GameName", "StartDate", "TicketPrice", "Type" }.Contains(key))
                        {
                            model.Columns.Add(key, GetValue<string>(properties, key));
                        }
                    }
                    result.Add(model);
                }
            }

            return result;
        }

        public async Task<IEnumerable<ReportPricePointDynamic>> LazyListPricePointDynamic(string customerCode, decimal ticketPrice, string startDate, string endDate)
        {
            string sql = "spLottery_GetSalesAndSellThru";

            var result = new List<ReportPricePointDynamic>();

            using (var connection = OpenConnection())
            {
                var reader = await connection.QueryAsync(
                        sql,
                        new { CustomerCode = customerCode, TicketPrice = ticketPrice, StartDate = startDate, EndDate = endDate },
                        commandType: CommandType.StoredProcedure);

                ReportPricePointDynamic model;
                foreach (var row in reader)
                {
                    var properties = (IDictionary<string, object>)row;

                    model = new ReportPricePointDynamic
                    {
                        GameID = GetValue<int>(properties, "GameID"),
                        GameReference = GetValue<string>(properties, "GameReference"),
                        GameName = GetValue<string>(properties, "GameName"),
                        StartDate = GetValue<DateTime>(properties, "StartDate"),
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        Type = GetValue<string>(properties, "Type"),
                        Columns = new Dictionary<string, string>(),
                        col1 = GetValue<string>(properties, "col1"),
                        col2 = GetValue<string>(properties, "col2"),
                        col3 = GetValue<string>(properties, "col3"),
                        col4 = GetValue<string>(properties, "col4"),
                        col5 = GetValue<string>(properties, "col5"),
                        col6 = GetValue<string>(properties, "col6"),
                        col7 = GetValue<string>(properties, "col7"),
                        col8 = GetValue<string>(properties, "col8"),
                        col9 = GetValue<string>(properties, "col9"),
                        col10 = GetValue<string>(properties, "col10"),
                        col11 = GetValue<string>(properties, "col11"),
                        col12 = GetValue<string>(properties, "col12"),
                        col13 = GetValue<string>(properties, "col13"),
                        col14 = GetValue<string>(properties, "col14"),
                        col15 = GetValue<string>(properties, "col15"),
                        col16 = GetValue<string>(properties, "col16"),
                        col17 = GetValue<string>(properties, "col17")
                    };
                    result.Add(model);
                }
            }

            return result;
        }

        public async Task<IEnumerable<ReportPricePoint>> ListPricePoint(string customerCode, decimal ticketPrice, string startDate, string endDate)
        {
            string sql = "spLottery_GetSalesAndSellThruByTicketPrice";

            var result = new List<ReportPricePoint>();

            using (var connection = OpenConnection())
            {
                var reader = await connection.QueryAsync(
                        sql,
                        new { CustomerCode = customerCode, TicketPrice = ticketPrice, StartDate = startDate, EndDate = endDate },
                        commandType: CommandType.StoredProcedure);

                foreach (var row in reader)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new ReportPricePoint
                    {
                        GameID = GetValue<int>(properties, "GameID"),
                        GameReferenceID = GetValue<string>(properties, "GameReferenceID"),
                        GameName = GetValue<string>(properties, "GameName"),
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        LaunchDate = GetValue<string>(properties, "Launch Date"),
                        WeekNumber = GetValue<int>(properties, "Week #"),
                        WeekEnding = GetValue<string>(properties, "Week Ending"),
                        Sales = GetValue<decimal>(properties, "Sales"),
                        AccumSellThru = GetValue<string>(properties, "Accum Sell-Thru"),
                        WeeksRemaining = GetValue<decimal>(properties, "Weeks Remaining"),
                    });
                }
            }

            return result;
        }

        public async Task<IEnumerable<ReportTop>> ListTop(string customerCode)
        {
            string sql = "spLottery_GetSalesForTop40";

            var result = new List<ReportTop>();

            using (var connection = OpenConnection())
            {
                var reader = await connection.QueryAsync(
                        sql,
                        new { CustomerCode = customerCode },
                        commandType: CommandType.StoredProcedure);

                ReportTop model;
                foreach (var row in reader)
                {
                    var properties = (IDictionary<string, object>)row;

                    model = new ReportTop
                    {
                        TicketPrice = GetValue<decimal>(properties, "Ticket Price"),
                        GameID = GetValue<string>(properties, "GameID"),
                        GameName = GetValue<string>(properties, "Game Name"),
                        LaunchDate = GetValue<string>(properties, "Launch Date"),
                        WeeksRemaining = GetValue<decimal>(properties, "Weeks Remaining"),
                        WeeksOnSale = GetValue<int>(properties, "Weeks On Sale"),
                        Dates = new Dictionary<string, decimal>()
                    };
                    foreach (var key in properties.Keys)
                    {
                        if (!new[] { "Ticket Price", "GameID", "Game Name", "Launch Date", "Weeks Remaining", "Weeks On Sale" }.Contains(key))
                        {
                            model.Dates.Add(key, GetValue<decimal>(properties, key));
                        }
                    }
                    result.Add(model);
                }
            }

            return result;
        }
    }
}







