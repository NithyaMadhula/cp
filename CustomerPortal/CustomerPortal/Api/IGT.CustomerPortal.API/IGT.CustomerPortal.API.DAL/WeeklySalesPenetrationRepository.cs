using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class WeeklySalesPenetrationRepository : Repository
    {
        public WeeklySalesPenetrationRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<WeeklySalesPenetration>> List(string customerCode, string endOfWeek, decimal ticketPrice)
        {
            const string sql = "spWeeklySalesPenetration_Get";
            List<WeeklySalesPenetration> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new
                            {
                                CustomerCode = customerCode,
                                EndOfWeek = endOfWeek,
                                TicketPrice = ticketPrice
                            },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<WeeklySalesPenetration>();
                        foreach (var row in temp)
                        {
                            var properties = (IDictionary<string, object>)row;
                            list.Add(new WeeklySalesPenetration
                            {
                                GameID = GetValue<int>(properties, "GameID"),
                                GameNumber = GetValue<int>(properties, "GameNumber"),
                                GameName = GetValue<string>(properties, "GameName"),
                                TicketPrice = GetValue<decimal>(properties, "TicketPrice"),
                                ActivatedRetailerCount = GetValue<int>(properties, "Retailer Count (Activated)"),
                                RetailerCount = GetValue<int>(properties, "Retailer Count (Activated/Confirmed/Issued/Settled)"),
                                TotalRetailers = GetValue<int>(properties, "TotalRetailers"),
                                CurrentPenetrationBasedOnActivations = GetValue<decimal>(properties, "Current Penetration (based on activations)"),
                                CurrentPenetration = GetValue<decimal>(properties, "Current Penetration (based on confirmed and issued, and activated settled"),
                                ActualPrintRun = GetValue<decimal>(properties, "ActualPrintRun"),
                                CurrentWeekValidations = GetValue<decimal>(properties, "Curr Week Validations"),
                                TotalValidations = GetValue<decimal>(properties, "Total Validations (up to Curr Week Selected)"),
                                TooltipInfo = GetValue<string>(properties, "Tooltip Info"),
                                TooltipConfirmedInfo = GetValue<string>(properties, "Tooltip Confirmed Info"),
                                PenPercentage = GetValue<decimal>(properties, "Pen %")
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
