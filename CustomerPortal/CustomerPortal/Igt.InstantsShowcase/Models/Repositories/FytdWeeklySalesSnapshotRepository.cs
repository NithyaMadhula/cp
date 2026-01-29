using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class FytdWeeklySalesSnapshotRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetSalesAverageByTicketPrice";

        public FytdWeeklySalesSnapshotRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<FytdWeeklySalesSnapshot>> List(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            List<FytdWeeklySalesSnapshot> list = null;

            using (var connection = OpenConnection())
            {
                try
                {
                    var reader = await connection.QueryAsync(
                            sql,
                            new { CustomerCode = customerCode, isFiscalYear },
                            commandType: CommandType.StoredProcedure);
                    if (reader.Any())
                    {
                        list = new List<FytdWeeklySalesSnapshot>();
                        foreach (var row in reader)
                        {
                            var properties = (IDictionary<string, object>)row;

                            list.Add(new FytdWeeklySalesSnapshot
                            {
                                TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                                CurrentYear = GetValue<int>(properties, "Current Year"),
                                CurrentWeekSales = GetValue<decimal>(properties, "Current Week Sales"),
                                PriorYear = GetValue<int>(properties, "Prior Year"),
                                PriorWeekSales = GetValue<decimal>(properties, "Prior Week Sales"),
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
