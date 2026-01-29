using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GameSalesRepository : Repository
    {
        public GameSalesRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<GameSales>> List(int gameId)
        {
            string sql = "spGame_GetEWRByGameID";

            var result = new List<GameSales>();

            using (var connection = OpenConnection())
            {
                var reader = await connection.QueryAsync(
                        sql,
                        new
                        {
                            GameId = gameId
                        },
                        commandType: CommandType.StoredProcedure);

                foreach (var row in reader)
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
            }

            return result;
        }
    }
}
