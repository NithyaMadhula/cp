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
    public class NaloYTDSalesRepository : Repository
    {
        public NaloYTDSalesRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<NaloYTDSales>> List(string customerCode)
        {
            string sql = "spLottery_GetTotalYTDSales";
            SetDapperCustomMapping();

            IEnumerable<NaloYTDSales> result = null;

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<NaloYTDSales>(
                        sql,
                        new
                        {
                            CustomerCode = customerCode,
                            IsFiscalYear = 0
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        void SetDapperCustomMapping()
        {
            var rateOfSalesColumnMaps = new Dictionary<string, string>
            {
                { "Curr Week","CurrWeek" },
                { "Curr Week Sales","CurrWeekSales" },
                { "YTD Sales","YTDSales" },
                { "Prior Year Week","PriorYearWeek" },
                { "Prior Year Week Sales", "PriorYearWeekSale" },
                { "Prior Year YTD Sales","PriorYearYTDSales" },
                { "Week Difference","WeekDifference" },
                { "as '% Change Week","PercentChangeWeek" },
                { "YTD Difference","YTDDifference" },
                { "% Change Year","PercentChangeYear" },
                { "Current Year","CurrentYear" },
                { "Start Month Day","StartMonthDay" },
                { "Sales Type","SalesType" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (rateOfSalesColumnMaps.ContainsKey(columnName))
                    return type.GetProperty(rateOfSalesColumnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var rateOfSalesMap = new CustomPropertyTypeMap(
                typeof(NaloYTDSales),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(NaloYTDSales), rateOfSalesMap);
        }
    }
}