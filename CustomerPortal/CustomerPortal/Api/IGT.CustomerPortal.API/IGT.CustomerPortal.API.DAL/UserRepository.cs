using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using IGT.CustomerPortal.API.Model;
using IGT.Utils.Databases;

namespace IGT.CustomerPortal.API.DAL
{
    public class UserRepository : Repository
    {
        const string SELECT_ALL = "SELECT u.*, c.* FROM [Users] u JOIN [Customers] c ON c.Id = u.CustomerId WHERE ";

        public UserRepository(IDbConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<User> Get(string email)
        {
            User result;
            using (var conn = OpenConnection())
            {
                try
                {
                    result = await Get(conn, email);
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return result;
        }

        public async Task<User> Get(IDbConnection conn, string username)
        {
            string sql = $"{SELECT_ALL}username = @Username";

            var list = await conn.QueryAsync<User, Customer, User>(
                            sql,
                            (user, customer) =>
                            {
                                user.Customer = customer;
                                return user;
                            },
                            new { Username = username },
                            splitOn: "Id");
            return list.FirstOrDefault();
        }
    }
}
