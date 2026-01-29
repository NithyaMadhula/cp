using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class PlayStyleRepository : Repository
    {
        public PlayStyleRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<PlayStyle>> List()
        {
            const string sql = "dbo.spPlaystyle_GetList";
            List<PlayStyle> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<PlayStyle>();
                        foreach (var item in temp)
                        {
                            list.Add(new PlayStyle
                            {
                                Id = item.PlaystyleID,
                                Name = item.PlaystyleName
                            });
                        }
                    }
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }

    }
}
