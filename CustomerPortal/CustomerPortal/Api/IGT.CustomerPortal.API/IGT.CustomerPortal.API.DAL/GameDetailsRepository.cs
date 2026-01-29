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
    public class GameDetailsRepository : Repository
    {
        public GameDetailsRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<GameDetails> Get(string customer, int gameId)
        {
            string sql = "spGame_GetDetailsByGameID";
            SetDapperCustomMapping();

            GameDetails result = null;


                using (var connection = OpenConnection())
                {
                    result = await connection.QueryFirstOrDefaultAsync<GameDetails>(
                            sql,
                            new
                            {
                                CustomerCode = customer,
                                GameId = gameId
                            },
                            commandType: CommandType.StoredProcedure);
                }


            return result;
        }

        public async Task<ConceptGameDetail> GetConcept(int gameId)
        {
            string sql = "spConcept_GetDetailsByGameID";
            SetDapperCustomMapping();

            ConceptGameDetail result = null;


            using (var connection = OpenConnection())
            {
                result = await connection.QueryFirstOrDefaultAsync<ConceptGameDetail>(
                        sql,
                        new
                        {
                            GameId = gameId
                        },
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
                { "Last 2 Year Sales", "Last2YearSales" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var detailedGameSearchMap = new CustomPropertyTypeMap(
                typeof(GameDetails),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(GameDetails), detailedGameSearchMap);
        }
    }
}
