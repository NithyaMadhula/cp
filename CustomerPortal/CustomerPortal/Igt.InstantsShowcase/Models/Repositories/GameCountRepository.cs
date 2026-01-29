using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GameCountRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTotalGameCount";

        public GameCountRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LotteryTotalGameCount>> List(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            List<LotteryTotalGameCount> list = null;

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
                        list = new List<LotteryTotalGameCount>();
                        foreach (var row in queryResult)
                        {
                            var properties = (IDictionary<string, object>)row;
                            list.Add(new LotteryTotalGameCount
                            {
                                Year = GetValue<int>(properties, "Year"),
                                GameCount = GetValue<int>(properties, "Game Count")
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
