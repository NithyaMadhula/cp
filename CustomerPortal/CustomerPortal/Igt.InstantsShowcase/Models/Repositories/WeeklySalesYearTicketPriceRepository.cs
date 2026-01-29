using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class WeeklySalesYearTicketPriceRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTotalSalesByWeekAndTicketPrice";

        public WeeklySalesYearTicketPriceRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<WeeklySalesYearTicketPrice>> List(string customerCode, int isFiscalYear, decimal ticketPrice)
        {
            string sql = SPROC;
            IEnumerable<WeeklySalesYearTicketPrice> list = null;

            using (var connection = OpenConnection())
            {
                    list = await connection.QueryAsync<WeeklySalesYearTicketPrice>(
                            sql,
                            new { CustomerCode = customerCode, isFiscalYear, TicketPrice = ticketPrice },
                            commandType: CommandType.StoredProcedure);

            }

            return list;
        }
    }
}
