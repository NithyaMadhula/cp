using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class PlayStyleIndexedRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetAverageCountByPlayStyle";

        public PlayStyleIndexedRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
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
                            var chartPlayStyle = new ChartIndexed
                            {
                                Group = properties["PlayStyle"].ToString(),
                                AverageIndex = int.Parse(properties["PlayStyleAverageIndex"].ToString()),
                                GamesCount = int.Parse(properties["PlayStyleCount"].ToString()),
                                TicketPrices = new Dictionary<string, string>()
                            };
                            foreach (var key in properties.Keys)
                            {
                                if (!new[] { "PlayStyle", "PlayStyleAverageIndex", "PlayStyleCount" }.Contains(key))
                                {
                                    chartPlayStyle.TicketPrices.Add(key, properties[key]?.ToString());
                                }
                            }
                            list.Add(chartPlayStyle);
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
