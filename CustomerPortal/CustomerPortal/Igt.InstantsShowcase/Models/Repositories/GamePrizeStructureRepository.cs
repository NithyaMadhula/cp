using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GamePrizeStructureRepository : Repository
    {
        public GamePrizeStructureRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<GamePrizeStructure>> List(string customer, int gameId)
        {
            string sql = "spGame_GetPrizeStructure";

            IEnumerable<GamePrizeStructure> result = null;

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<GamePrizeStructure>(
                        sql,
                        new
                        {
                            GameId = gameId,
                            CustomerCode = customer
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }
    }
}
