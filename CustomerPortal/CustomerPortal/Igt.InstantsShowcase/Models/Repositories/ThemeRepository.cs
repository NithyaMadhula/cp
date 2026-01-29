using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class ThemeRepository : Repository
    {
        public ThemeRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<Theme>> ListForGameSeach()
        {
            string sql = "dbo.spTheme_GetList";
            List<Theme> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Theme>();
                        foreach (var item in temp)
                        {
                            list.Add(new Theme
                            {
                                Id = item.ThemeID,
                                Name = item.ThemeName
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

        public async Task<IEnumerable<Theme>> List()
        {
            string sql = "dbo.spTheme_GetList";
            List<Theme> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Theme>();
                        foreach (var item in temp)
                        {
                            list.Add(new Theme
                            {
                                Id = item.ThemeID,
                                Name = item.ThemeName
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
