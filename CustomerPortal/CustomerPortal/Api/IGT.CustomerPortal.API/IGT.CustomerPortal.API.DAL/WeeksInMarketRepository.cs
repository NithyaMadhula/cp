using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class WeeksInMarketRepository : Repository
    {
        public WeeksInMarketRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<WeeksInMarket>> List(string customerCode, string endOfWeek, decimal ticketPrice)
        {
            const string sql = "spWeeklySalesPenetration_GetRateOfSalesByDateAndPrice";
            SetDapperCustomMapping();

            IEnumerable<WeeksInMarket> list = null;
            using (var conn = OpenConnection())
            {
                list = await conn.QueryAsync<WeeksInMarket>(
                        sql,
                        new
                        {
                            CustomerCode = customerCode,
                            EndOfWeek = endOfWeek,
                            TicketPrice = ticketPrice
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return list;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                {"#Of Tickets","NumberOfTickets"},
                {"Retailer Count (Activated)","ActivatedRetailerCount"},
                {"Retailer Count (Activated/Confirmed/Issued/Settled)","RetailerCount"},
                {"Current Penetration (based on activations)","CurrentPenetrationBasedOnActivations"},
                {"Current Penetration (based on confirmed and issued, and activated settled","CurrentPenetration"},
                {"Validation Total","ValidationTotal"},
                {"Running Total","RunningTotal"},
                {"Tooltip Info","TooltipInfo"},
                {"Tooltip Confirmed Info","TooltipConfirmedInfo"},
                {"Pen %","PenPercentage"}
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var weeksInMarketMap = new CustomPropertyTypeMap(
                typeof(WeeksInMarket),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(WeeksInMarket), weeksInMarketMap);
        }
    }
}
