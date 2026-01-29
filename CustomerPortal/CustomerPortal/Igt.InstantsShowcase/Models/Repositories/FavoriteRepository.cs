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
    public class FavoriteRepository : Repository
    {
        public FavoriteRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<DetailedFavorite>> List(string username)
        {
            string sproc = "dbo.spFavorite_Get";
            SetDapperCustomMapping();
            IEnumerable<DetailedFavorite> list = null;

            using (var connection = OpenConnection())
            {
                list = await connection.QueryAsync<DetailedFavorite>(
                    sproc,
                    new { UserName = username },
                    commandType: CommandType.StoredProcedure);
            }

            return list;
        }

        public async Task<bool> Insert(string userName, int gameId)
        {
            string sproc = "dbo.spFavorite_Save";

            int result = -1;
            using (var conn = OpenConnection())
            {
                try
                {
                    DynamicParameters _params = new DynamicParameters();
                    _params.Add("@UserName", userName);
                    _params.Add("@GameID", gameId);
                    _params.Add("@RetVal", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    _params.Add("@RetMsg", "", dbType: DbType.AnsiString, direction: ParameterDirection.Output);
                    await conn.ExecuteAsync(sproc, _params, commandType: CommandType.StoredProcedure);
                    result = _params.Get<int>("RetVal");
                }
                finally
                {
                    CloseConnection(conn);
                }
            }
            return result == 0;
        }

        public async Task<bool> Delete(int favoriteId)
        {
            string sproc = "dbo.spFavorite_Del";

            int result;
            using (var conn = OpenConnection())
            {
                try
                {
                    DynamicParameters _params = new DynamicParameters();
                    _params.Add("@FavoriteID", favoriteId);
                    _params.Add("@RetVal", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    _params.Add("@RetMsg", "", dbType: DbType.AnsiString, direction: ParameterDirection.Output);
                    await conn.ExecuteAsync(sproc, _params, commandType: CommandType.StoredProcedure);
                    result = _params.Get<int>("RetVal");
                }
                finally
                {
                    CloseConnection(conn);
                }
            }
            return result == 0;
        }

        void SetDapperCustomMapping()
        {
            var columnMaps = new Dictionary<string, string>
            {
                { "Path", "ImgName" }
            };

            var mapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {
                if (columnMaps.ContainsKey(columnName))
                    return type.GetProperty(columnMaps[columnName]);
                else
                    return type.GetProperty(columnName);
            });

            var detailedFavoriteMap = new CustomPropertyTypeMap(
                typeof(DetailedFavorite),
                (type, columnName) => mapper(type, columnName)
                );

            SqlMapper.SetTypeMap(typeof(DetailedFavorite), detailedFavoriteMap);
        }

    }
}
