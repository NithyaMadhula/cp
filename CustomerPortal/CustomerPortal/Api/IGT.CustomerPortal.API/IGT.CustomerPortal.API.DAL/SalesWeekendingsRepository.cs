using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class SalesWeekendingsRepository : Repository
    {
        public SalesWeekendingsRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<SalesWeekendings>> List(string customer)
        {
            string sql = "spWeeklySalesPenetration_GetWeekEnding";
            List<SalesWeekendings> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCode = customer },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<SalesWeekendings>();
                        foreach (var item in temp)
                        {
                            list.Add(new SalesWeekendings
                            {
                                WeekEnding = item.WeekEnding
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
