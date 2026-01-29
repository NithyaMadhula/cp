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
    public class TicketBreakdownRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetTicketSales";

        public TicketBreakdownRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<Ticketbreakdown>> List(string customerCode, int? isFiscalYear)
        {
            string sql = SPROC;
            IEnumerable<Ticketbreakdown> list = null;
            SetDapperCustomMapping();

            using (var conn = OpenConnection())
            {
                list = await conn.QueryAsync<Ticketbreakdown>(
                        sql,
                        new { CustomerCode = customerCode, isFiscalYear = isFiscalYear ?? 0 },
                        commandType: CommandType.StoredProcedure);
            }

            foreach (var bd in list)
            {
                bd.PercentChangeWeek = bd.PercentChangeWeek ?? "N/A";
            }

            return list;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "Ticket Price",          "TicketPrice" },
                { "Curr Week Sales",       "CurrWeekSales" },
                { "YTD Sales",             "YTDSales" },
                { "% Sales YTD",           "PercentSalesYTD" },
                { "Prior Week Sales",  "PriorYearWeekSales" },
                { "Prior Year YTD Sales",  "PriorYearYTDSales" },
                { "% Sales Prior YTD",     "PercentSalesPriorYTD" },
                { "Week Difference",       "WeekDifference" },
                { "% Change Week",         "PercentChangeWeek" },
                { "YTD Difference",        "YTDDifference" },
                { "% Change Year",         "PercentChangeYear" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var ticketBreakdownMap = new CustomPropertyTypeMap(
                typeof(Ticketbreakdown),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(Ticketbreakdown), ticketBreakdownMap);
        }
    }
}
