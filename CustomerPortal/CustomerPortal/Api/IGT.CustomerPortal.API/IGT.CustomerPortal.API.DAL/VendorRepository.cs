using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class VendorRepository : Repository
    {
        public VendorRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<Vendor>> List()
        {
            const string sql = "dbo.spVendor_GetList";
            List<Vendor> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Vendor>();
                        foreach (var item in temp)
                        {
                            list.Add(new Vendor
                            {
                                Id = item.VendorID,
                                Name = item.VendorName
                            });
                        }
                    }
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
