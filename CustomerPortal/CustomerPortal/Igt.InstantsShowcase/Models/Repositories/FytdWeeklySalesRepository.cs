using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class FytdWeeklySalesRepository : Repository
    {
        const string SPROC = "dbo.spLottery_GetYearlySalesByTicketPrice";

        public FytdWeeklySalesRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<FytdWeeklySales>> List(string customerCode, int isFiscalYear)
        {
            string sql = SPROC;
            SetDapperCustomMapping();

            IEnumerable<FytdWeeklySales> list = null;
            using (var connection = OpenConnection())
            {
                list = await connection.QueryAsync<FytdWeeklySales>(
                         sql,
                         new { CustomerCode = customerCode, isFiscalYear },
                         commandType: CommandType.StoredProcedure);
            }

            return list;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "Current Year", "CurrentYear" },
                { "Current Week Sales", "CurrentWeekSales" },
                { "Prior Week Sales", "PriorWeekSales" },
                { "Prior Year", "PriorYear" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var ticketBreakdownMap = new CustomPropertyTypeMap(
                typeof(FytdWeeklySales),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(FytdWeeklySales), ticketBreakdownMap);
        }

    }
}
