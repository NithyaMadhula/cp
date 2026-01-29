using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class AverageSellingPriceRepository : Repository
    {
        public AverageSellingPriceRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LotteryAverageSellingPrice>> List(int yearType, string customerCode)
        {
            string sql = "spLottery_GetSalesAverageByYear";
            SetDapperCustomMapping();

            IEnumerable<LotteryAverageSellingPrice> result = null;

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<LotteryAverageSellingPrice>(
                        sql,
                        new { CustomerCode = customerCode, isFiscalYear = yearType },
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "Total Sales",   "TotalSales" },
                { "Total Quantity","TotalQuantity" },
                { "Average Price", "AveragePrice" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var ticketBreakdownMap = new CustomPropertyTypeMap(
                typeof(LotteryAverageSellingPrice),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(LotteryAverageSellingPrice), ticketBreakdownMap);
        }
    }
}
