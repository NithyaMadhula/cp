using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class NaloLotterySalesRepository : Repository
    {
        public NaloLotterySalesRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<NaloLotterySales>> List(string customerCode, string startDate)
        {
            string sql = "spLottery_GetSalesByYear";

            var result = new List<NaloLotterySales>();

            using (var connection = OpenConnection())
            {
                var reader = await connection.QueryAsync(
                        sql,
                        new
                        {
                            CustomerCode = customerCode,
                            StartDate = startDate
                        },
                        commandType: CommandType.StoredProcedure);

                foreach (var row in reader)
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
            }

            return result;
        }
    }
}