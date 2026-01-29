using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class FeatureIndexedRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetAverageCountByFeature";

        public FeatureIndexedRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
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
                                Group = properties["Feature"].ToString(),
                                AverageIndex = int.Parse(properties["FeatureAverageIndex"].ToString()),
                                GamesCount = int.Parse(properties["FeatureCount"].ToString()),
                                TicketPrices = new Dictionary<string, string>()
                            };
                            foreach (var key in properties.Keys)
                            {
                                if (!new[] { "Feature", "FeatureAverageIndex", "FeatureCount" }.Contains(key))
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
