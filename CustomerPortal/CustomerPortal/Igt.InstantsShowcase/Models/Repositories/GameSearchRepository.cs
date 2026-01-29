using Dapper;
using Igt.InstantsShowcase.Models;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GameSearchRepository : Repository
    {
        public GameSearchRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<GameSearch>> List(string customerCode, string gameName,
            int ticketPrice = -1, int year = -1, string theme = null, int pageSize = -1, int pageIndex = -1)
        {
            string sql = "spGame_GetDetailsByGameSearch";
            SetDapperCustomMapping();

            IEnumerable<GameSearch> result = new List<GameSearch>();

            dynamic param = new ExpandoObject();
            param.CustomerCode = customerCode;
            param.GameName = gameName;
            param.TicketPrice = ticketPrice;
            param.Year = year;
            param.ThemeID = theme;
            if (pageIndex != -1 && pageSize != -1)
            {
                param.PageSize = pageSize;
                param.PageIndex = pageIndex;
            }

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<GameSearch>(
                        sql,
                        (object)param,
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "Current Year Sales", "CurrentYearSales" },
                { "Last Year Sales", "LastYearSales" },
                { "Last 2 Year Sales", "Last2YearSales" },
                { "ImgName", "ImagePath" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var detailedGameSearchMap = new CustomPropertyTypeMap(
                typeof(GameSearch),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(GameSearch), detailedGameSearchMap);
        }
    }
}
