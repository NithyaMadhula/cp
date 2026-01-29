using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace IGT.CustomerPortal.API.DAL
{
    public class LotteryRepository : Repository
    {
        public LotteryRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<Customer>> List(int domesticOrInternationalId)
        {
            string sql = "spLottery_GetCustomerWithSales";
            List<Customer> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { isInternational = domesticOrInternationalId },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Customer>();
                        foreach (var item in temp)
                        {
                            list.Add(new Customer
                            {
                                Code = item.CustomerCode,
                                Name = item.BusinessName,
                                LogoUri = item.LogoName,
                                SubdivisionCode = item.SubDivisionCode
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

        public async Task<IEnumerable<Customer>> ListWithPenetation(int domesticOrInternationalId)
        {
            string sql = "spLottery_GetCustomerWithPenetration";
            List<Customer> list = null;

            using (var conn = OpenConnection())
            {
                try
                {
                    var temp = await conn.QueryAsync(
                            sql,
                            new { isInternational = domesticOrInternationalId },
                            commandType: CommandType.StoredProcedure);

                    if (temp.Any())
                    {
                        list = new List<Customer>();
                        foreach (var item in temp)
                        {
                            list.Add(new Customer
                            {
                                Code = item.CustomerCode,
                                Name = item.BusinessName,
                                LogoUri = item.LogoName,
                                SubdivisionCode = item.SubDivisionCode
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
