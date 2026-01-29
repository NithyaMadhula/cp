using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class ThemesPrior12MonthsRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTicketSalesCountByTheme";

        public ThemesPrior12MonthsRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LotteryPrimaryTheme>> List(string customerCode, decimal ticketPrice)
        {
            string sql = SPROC;
            List<LotteryPrimaryTheme> list = null;

            using (var connection = OpenConnection())
            {
                try
                {
                    var queryResult = await connection.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode, TicketPrice = ticketPrice },
                            commandType: CommandType.StoredProcedure);

                    if (queryResult != null)
                    {
                        list = new List<LotteryPrimaryTheme>();
                        foreach (var row in queryResult)
                        {
                            var properties = (IDictionary<string, object>)row;
                            list.Add(new LotteryPrimaryTheme
                            {
                                Count = int.Parse(properties["RecCount"].ToString()),
                                PrimaryTheme = properties["PrimaryTheme"].ToString()
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
