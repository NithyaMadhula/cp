using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class FeatureRepository : Repository
    {
        public FeatureRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<Feature>> List()
        {
            const string sql = "dbo.spFeature_GetList";
            SetDapperCustomMapping();

            IEnumerable<Feature> list = null;

            using (var conn = OpenConnection())
            {
                list = await conn.QueryAsync<Feature>(
                        sql,
                        commandType: CommandType.StoredProcedure);
            }

            return list;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "FeatureID",          "Id" },
                { "FeatureName",       "Name" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var ticketBreakdownMap = new CustomPropertyTypeMap(
                typeof(Feature),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(Feature), ticketBreakdownMap);
        }

    }
}
