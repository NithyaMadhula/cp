using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GameCountByYearPriceRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTotalGameCountByYearAndPrice";

        public GameCountByYearPriceRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LotteryGameCountPriorYearsByTicketPrice>> List(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            List<LotteryGameCountPriorYearsByTicketPrice> list = null;

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
                        list = new List<LotteryGameCountPriorYearsByTicketPrice>();
                        foreach (var row in queryResult)
                        {
                            var properties = (IDictionary<string, object>)row;
                            list.Add(new LotteryGameCountPriorYearsByTicketPrice
                            {
                                Year = int.Parse(properties["Year"].ToString()),
                                TicketPrice = decimal.Parse(properties["TicketPrice"].ToString()),
                                GameCount = int.Parse(properties["Game Count"].ToString())
                                //Tooltip = properties["Tooltip Info"].ToString()
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
