using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GameCountByPriceRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTotalGameCountByPrice";

        public GameCountByPriceRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LotteryGameCountByPrice>> List(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            List<LotteryGameCountByPrice> list = null;

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
                        list = new List<LotteryGameCountByPrice>();
                        foreach (var row in queryResult)
                        {
                            var properties = (IDictionary<string, object>)row;
                            list.Add(new LotteryGameCountByPrice
                            {
                                TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
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
