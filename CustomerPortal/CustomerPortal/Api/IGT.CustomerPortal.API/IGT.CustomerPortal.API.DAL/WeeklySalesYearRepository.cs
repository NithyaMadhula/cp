using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class WeeklySalesYearRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTotalSalesByWeek";

        public WeeklySalesYearRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LotteryFYTDWeeklySalesAndPriorYears>> List(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            List<LotteryFYTDWeeklySalesAndPriorYears> list = null;

            using (var connection = OpenConnection())
            {
                try
                {
                    var queryResult = await connection.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode, isFiscalYear },
                            commandType: CommandType.StoredProcedure);

                    if (queryResult != null)
                    {
                        list = new List<LotteryFYTDWeeklySalesAndPriorYears>();
                        foreach (var row in queryResult)
                        {
                            var properties = (IDictionary<string, object>)row;
                            list.Add(new LotteryFYTDWeeklySalesAndPriorYears
                            {
                                WeekEndDate = GetValue<DateTime>(properties, "WeekEndDate"),
                                WeekSales = GetValue<decimal>(properties, "WeekSales"),
                                Year = GetValue<int>(properties, "Year"),
                                Month = GetValue<string>(properties, "Month")
                            });
                        }
                    }
                }
                finally
                {
                    CloseConnection(connection);
                }
            }

            return list;
        }
    }
}
