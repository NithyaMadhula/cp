using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class LicensedPropertyRepository : Repository
    {
        public LicensedPropertyRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<LicensedProperty>> List()
        {
            const string sql = "dbo.spLicensedProperty_GetList";
            List<LicensedProperty> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<LicensedProperty>();
                        foreach (var item in temp)
                        {
                            list.Add(new LicensedProperty
                            {
                                Id = item.LicensedPropertyID,
                                Name = item.LicensedPropertyName
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    var a = ex;
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return list;
        }
    }
}
