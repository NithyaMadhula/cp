using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class InstantWeeklySalesRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTotalYTDSales";

        public InstantWeeklySalesRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<Weeklysales> Get(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            List<Weeklysales> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var queryResult = await conn.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode, isFiscalYear = 1 },
                            commandType: CommandType.StoredProcedure);

                    if (queryResult.Any())
                    {
                        list = new List<Weeklysales>();
                        foreach (var row in queryResult)
                        {
                            var properties = (IDictionary<string, object>)row;
                            list.Add(new Weeklysales
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
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list?.First();
        }
    }
}
