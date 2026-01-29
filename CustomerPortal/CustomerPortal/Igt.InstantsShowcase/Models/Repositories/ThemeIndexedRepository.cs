using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class ThemeIndexedRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetAverageCountByTheme";

        public ThemeIndexedRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<ChartIndexed>> List(string customerCode)
        {
            string sql = SPROC;
            List<ChartIndexed> list = null;

            using (var connection = OpenConnection())
            {
                try
                {
                    var queryResult = await connection.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (queryResult != null)
                    {
                        list = new List<ChartIndexed>();
                        foreach (var row in queryResult)
                        {
                            var properties = (IDictionary<string, object>)row;
                            var chartTheme = new ChartIndexed
                            {
                                Group = properties["Theme"].ToString(),
                                AverageIndex = int.Parse(properties["ThemeAverageIndex"].ToString()),
                                GamesCount = int.Parse(properties["ThemeCount"].ToString()),
                                TicketPrices = new Dictionary<string, string>()
                            };
                            foreach (var key in properties.Keys)
                            {
                                if (!new[] { "Theme", "ThemeAverageIndex", "ThemeCount" }.Contains(key))
                                {
                                    chartTheme.TicketPrices.Add(key, properties[key]?.ToString());
                                }
                            }
                            list.Add(chartTheme);
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
