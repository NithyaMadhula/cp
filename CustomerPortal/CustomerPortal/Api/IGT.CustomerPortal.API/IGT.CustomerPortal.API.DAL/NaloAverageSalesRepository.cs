using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class NaloAverageSalesRepository : Repository
    {
        public NaloAverageSalesRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<NaloAverageSales>> List(string[] customerCodes, string startDate, string endDate, string priorStartDate)
        {
            string sql = "spLottery_GetSalesByCustomerAndYear";

            var result = new List<NaloAverageSales>();

            using (var connection = OpenConnection())
            {
                string customers = string.Join(",", customerCodes);
                var reader = await connection.QueryAsync(
                        sql,
                        new
                        {
                            CustomerCodes = customers,
                            StartDate = startDate,
                            EndDate = endDate,
                            PriorStartDate = priorStartDate
                        },
                        commandType: CommandType.StoredProcedure);

                string path = null, fileName = null;
                foreach (var row in reader)
                {
                    var properties = (IDictionary<string, object>)row;

                    result.Add(new NaloAverageSales
                    {
                        TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                        AverageCurrent = GetValue<decimal>(properties, "Average Curr"),
                        PercentCurrent = GetValue<decimal>(properties, "Percent Curr"),
                        AveragePrior = GetValue<decimal>(properties, "Average Prior"),
                        PercentPrior = GetValue<decimal>(properties, "Percent Prior")
                    });
                }
            }

            return result;
        }
    }
}
