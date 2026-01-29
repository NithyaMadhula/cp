using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class GameRepository : Repository
    {
        public GameRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<GameFeatured>> ListFeatured(string customerCode, int pageSize = -1, int pageIndex = -1)
        {
            string sql = "spGame_GetFeaturedGames";
            SetDapperCustomMapping();

            IEnumerable<GameFeatured> result = new List<GameFeatured>();
            dynamic param = new ExpandoObject();
            if (pageIndex != -1 && pageSize != -1)
            {
                param.PageSize = pageSize;
                param.PageIndex = pageIndex;
            }

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<GameFeatured>(
                        sql,
                        (object)param,
                        commandType: CommandType.StoredProcedure);
            }

            return result;
        }

        public async Task<IEnumerable<ConceptFeatured>> ListConceptFeatured(int pageSize = -1, int pageIndex = -1)
        {
            string sql = "spConcept_GetFeaturedGames";

            IEnumerable<ConceptFeatured> result = new List<ConceptFeatured>();
            dynamic param = new ExpandoObject();
            if (pageIndex != -1 && pageSize != -1)
            {
                param.PageSize = pageSize;
                param.PageIndex = pageIndex;
            }

            using (var connection = OpenConnection())
            {
                result = await connection.QueryAsync<ConceptFeatured>(
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
                { "ImgName", "ImagePath" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var gameFeaturedMap = new CustomPropertyTypeMap(
                typeof(GameFeatured),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(GameFeatured), gameFeaturedMap);
        }
    }
}
