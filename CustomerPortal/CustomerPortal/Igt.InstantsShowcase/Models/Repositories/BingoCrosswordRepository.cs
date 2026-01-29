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
    public class BingoCrosswordRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetBingoCrosswordTotalSalesByYear";

        public BingoCrosswordRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LotteryBingoCrossword>> List(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            SetDapperCustomMapping();

            IEnumerable<LotteryBingoCrossword> list = null;
            using (var connection = OpenConnection())
            {
                list = await connection.QueryAsync<LotteryBingoCrossword>(
                        sql,
                        new { CustomerCode = customerCode, isFiscalYear },
                        commandType: CommandType.StoredProcedure);
            }

            return list;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "ThemeName",   "Theme" },
                { "Week Sales","WeekSales" },
                { "YTD Sales", "YTDSales" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var lotteryBingoMap = new CustomPropertyTypeMap(
                typeof(LotteryBingoCrossword),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(LotteryBingoCrossword), lotteryBingoMap);
        }
    }
}
