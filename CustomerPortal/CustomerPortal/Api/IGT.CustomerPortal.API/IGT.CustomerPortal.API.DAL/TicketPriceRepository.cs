using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class TicketPriceRepository : Repository
    {
        public TicketPriceRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<TicketPrice>> List(string customerCode)
        {
            const string sql = "spLottery_GetTicketPrice";
            List<TicketPrice> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCodes = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<TicketPrice>();
                        foreach (var item in temp)
                        {
                            list.Add(new TicketPrice
                            {
                                Value = item.TicketPrice
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

        public async Task<IEnumerable<TicketPrice>> ListPenetration(string customerCode)
        {
            const string sql = "spWeeklySalesPenetration_GetTicketPrice";
            List<TicketPrice> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<TicketPrice>();
                        foreach (var item in temp)
                        {
                            list.Add(new TicketPrice
                            {
                                Value = item.TicketPrice
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
