using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GameLaunchRepository : Repository
    {
        public GameLaunchRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<GameLaunch>> List(int startYear, string customerCode, 
            int ticketPrice = -1, int isIncludePriorYear = 0, int isShowIndex = 1, int isFiscalYear = 0)
        {
            string sql = "spLottery_GetGameCountAndIndex";

            IEnumerable<GameLaunch> result = null;

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<GameLaunch>(
                        sql,
                        new
                        {
                            CustomerCode = customerCode,
                            StartYear = startYear,
                            TicketPrice = ticketPrice,
                            IsIncludePriorYear = isIncludePriorYear,
                            IsShowIndex = isShowIndex,
                            IsFiscalYear = isFiscalYear
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }
    }
}
