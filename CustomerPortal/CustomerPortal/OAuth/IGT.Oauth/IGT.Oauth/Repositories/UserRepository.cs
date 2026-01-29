using Dapper;
using IGT.Oauth.Models;
using IGT.Oauth.Utils;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IGT.Oauth.Repositories
{
    public class UserRepository : Repository, IUserRepository
    {
        public UserRepository(Func<IDbConnection> openConnection) : base(openConnection)
        {
        }

        public async Task<User> GetAsync(string username, string clientid = null, bool fullModel = false)
        {
            IEnumerable<User> result;
            using (var connection = OpenConnection())
            {
                if (fullModel)
                {
                    result = await GetFull(connection, username, clientid);
                }
                else
                {
                    result = await connection.QueryAsync<User>("SELECT * FROM [Users] WHERE [Username]=@username AND [Enabled]=1",
                        new { username });
                }
            }
            return result.SingleOrDefault();
        }

        public bool Insert(User user)
        {
            using (var connection = OpenConnection())
            {
                user.Password = HashHelper.BCryptEncrypt(user.Password);
                var queryResult = connection.Execute("INSERT INTO Users (Username, Password) VALUES (@Username, @Password)", user);

                return true;
            }
        }

        async Task<IEnumerable<User>> GetFull(IDbConnection connection, string username, string clientid)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT u.*, c.*, r.* FROM [Users] u ");
            sb.Append("JOIN [Customers] c ON u.CustomerId = c.Id ");
            sb.Append("JOIN [UserRoles] ur ON ur.UserId = u.Id ");
            sb.Append("JOIN [Roles] r ON ur.RoleId = r.Id ");
            sb.Append("JOIN [Clients] l ON ur.ClientId = l.Id ");
            sb.Append("WHERE u.Username = @username AND l.ClientId = @clientid AND u.Enabled = 1");

            var userDictionary = new Dictionary<int, User>();
            var list = await connection.QueryAsync<User, Customer, Role, User>(
                    sb.ToString(),
                    (user, customer, role) =>
                    {
                        User userEntry;
                        if (!userDictionary.TryGetValue(user.Id, out userEntry))
                        {
                            userEntry = user;
                            userEntry.Customer = customer;
                            userEntry.Roles = new List<Role>();
                            userDictionary.Add(userEntry.Id, userEntry);
                        }

                        userEntry.Roles.AsList().Add(role);
                        return userEntry;
                    },
                    new { username, clientid },
                    splitOn: "Id");
            return userDictionary.Values.ToList();
        }

    }

}