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
    public class RateOfSalesRepository : Repository
    {
        public RateOfSalesRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<RateOfSales>> List(string customerCode, string endOfWeek)
        {
            string sql = "spWeeklySalesPenetration_GetRateOfSalesByDate";
            SetDapperCustomMappingROS();

            IEnumerable<RateOfSales> result = null;

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<RateOfSales>(
                        sql,
                        new
                        {
                            CustomerCode = customerCode,
                            EndOfWeek = endOfWeek
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        public async Task<IEnumerable<RateOfSalesTrend>> ListTrend(string customerCode, string startDate, decimal ticketPrice, int exclude)
        {
            string sql = "spWeeklySalesPenetration_GetRateOfSalesWithExclude";
            SetDapperCustomMappingTrend();

            IEnumerable<RateOfSalesTrend> result = null;

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<RateOfSalesTrend>(
                        sql,
                        new
                        {
                            CustomerCode = customerCode,
                            StartDate = startDate,
                            TicketPrice = ticketPrice,
                            IsExclude = 0
                        },
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        void SetDapperCustomMappingROS()
        {
            var rateOfSalesColumnMaps = new Dictionary<string, string>
            {
                { "Price-Name", "PriceName" },
                { "Game Name", "GameName" },
                { "Rate of Sales", "Rate" },
                { "Tooltip Info", "TooltipInfo" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (rateOfSalesColumnMaps.ContainsKey(columnName))
                    return type.GetProperty(rateOfSalesColumnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var rateOfSalesMap = new CustomPropertyTypeMap(
                typeof(RateOfSales),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(RateOfSales), rateOfSalesMap);
        }

        void SetDapperCustomMappingTrend()
        {
            var rateOfSalesColumnMaps = new Dictionary<string, string>
            {
                { "Price-Name", "PriceName" },
                { "Rate of Sales", "Rate" },
                { "Tooltip Info", "TooltipInfo" },
                { "Pen %", "PenPercentage" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (rateOfSalesColumnMaps.ContainsKey(columnName))
                    return type.GetProperty(rateOfSalesColumnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var rateOfSalesMap = new CustomPropertyTypeMap(
                typeof(RateOfSalesTrend),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(RateOfSalesTrend), rateOfSalesMap);
        }
    }
}
